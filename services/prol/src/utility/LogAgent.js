const REST = require('request');
const performanceMonitor = require('execution-time');

const LogCompress = require('./LogCompress');
const LogFile = require('./Appenders/LogFileAppender');

const OPTIONS = { enable: true, api: "", compress: false, progress: false, localContingency: true }
const HEADERS = { "Content-Type": "application/json" }

module.exports.configure = (opts) =>
{
    if (opts.enable) OPTIONS.enable = opts.enable;
    if (opts.api) OPTIONS.api = opts.api;
    if (opts.compress) OPTIONS.compress = opts.compress;    
    if (opts.progress) OPTIONS.progress = opts.progress;    
    if (opts.localContingency) OPTIONS.localContingency = opts.localContingency;
}

module.exports.createSession = () =>
{
    return new Promise(
        async (done, reject) =>
        {
            _request('get', `${OPTIONS.api}session`, null,
                null, 
                (response) =>
                {
                    if (response)
                    {
                        console.log("Get Session", response);
                        let body = JSON.parse(response);
                        if (body.guid) { done(body.guid); }
                        else { done(null); }
                    }
                    else { done(null); }
                }
            );
        }
    )
}

module.exports.send = async (resource, session) =>
{
    return new Promise(
        async (done, reject) =>
        {
            resource = `${OPTIONS.api}${resource}`;
            if (session.Offline == true)
            {
                saveContingency(resource, session, null);
                done(true);
            }
            else
            {
                _request('get', resource, session, 
                        null, 
                        (response) => { if (response) { done(true) } else { done(false) } }
                );
            }
        }
    ); 
}

module.exports.save = async (session) =>
{
    return new Promise(
        async (done, reject)=>
        {
            let resource = `${OPTIONS.api}api/${session.RequestId}`;
            if (session.Offline == true)
            {
                saveContingency(resource, session, 
                    async() =>
                    {
                        return JSON.stringify(session.LogIndexed, null, 4);
                    }                    
                );
                done(true);
            }
            else
            {            
                _request('post', resource, session,
                    async() =>
                    {
                        let json = session.LogIndexed;
                        let parseLog = { log: json };
                        if (OPTIONS.compress == true)
                        {
                            parseLog.log = await LogCompress.compress(JSON.stringify(json, null, 4)); //pretty compress
                            parseLog.compress = true;
                        }
                        return JSON.stringify(parseLog);                     
                    }, 
                    (response)=> { if (response) { done(true); } else { done(false); }  }
                );
            }
        }
    );
}

const _request = async(method, url, session, getContent, done) =>
{
    if (OPTIONS.enable == true)
    {    
        try
        {
            let timer = performanceMonitor();
            timer.start();                        
            let request = 
            { 
                headers: HEADERS,
                uri: url
            }
            let content = (getContent) ? await getContent() : null;
            if (content) { request.body = content; }

            let response = (error, response, body) =>
            {
                console.log(`LogAgent elapsed ${timer.stop().words}: ${method.toUpperCase()} ${url}`);
                if (error) 
                { 
                    console.log(error.message); 
                    saveContingency(url, session, getContent)                    
                    done(null);
                }
                else
                {
                    if (response.statusCode == 200)
                    {
                        done(body);
                    }
                    else
                    {
                        console.log(`Status ${response.statusCode}: ${response.statusMessage}`);
                        done(null);
                    }
                }
            }

            if (method == "post") { REST.post(request, response); }
            if (method == "put") { REST.put(request, response); }        
            if (method == "get") { REST.get(request, response); }
        }
        catch (exception)              
        {
            console.log("LogAgent fail connection", exception.message)
            saveContingency(url, session, getContent)
            done(null);
        }  
    }  
    else
    {
        done(null);
    }
}

const saveContingency = async(resource, session, getContent) =>
{
    //Si falla el envio al servidor de log, generar localmente los logs
    if (OPTIONS.localContingency == true)
    {
        if (session && session.RequestId)
        {
            console.log("save localContingency", session.RequestId);            
            let content;
            if (getContent) { content = await getContent(); }

            if (content)
            {
                LogFile.info(session.RequestId, JSON.stringify(content, null, 4));
            }
            else
            {
                LogFile.info(session.RequestId, resource);
            }
        }
        else
        {
            console.log("save localContingency");
            LogFile.info('app', resource);
        }
    }
}
