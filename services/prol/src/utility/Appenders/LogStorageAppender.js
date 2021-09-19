const Stream = require('stream');
const Base = require('./LogBaseAppender');

const OPTIONS = 
                {
                    enable: true,    
                    path: "./logs",
                    level: "info"
                }

const LogRaw = '' +
                'Endpoint: $method $url' +
                'Request:\n' +
                'Headers:\n' +
                '$header' +
                'Body:\n' +
                '$body' +
                'Time:\n' +
                '$start\n' +
                '$end\n' +                
                '$duration\n' +                
                '\n' +
                'Execution:\n' +
                '$line\n' +
                '\n' +
                'Response:\n' +
                'Code: $statusCode\n' +
                'Output:\n' +
                '$output';

class Log
{

    constructor()
    {
        this.endpoint = "";
        this.method = "";
        this.address = "";
        this.request =  {
                            //headers: {},
                            query: {},
                            params: {},
                            body: {},
                            time: {}
                        }
        this.logs = [],
        this.response = { statusCode: "", output: {} }
    }

}                    

const streamFromString = (raw) =>
{
    const Readable = Stream.Readable;
    const stream = new Readable();
    stream._read = function noop() {};
    stream.push(raw);
    stream.push(null);
    return stream;
} 

module.exports.configure = (opts) =>
{
    if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
    if (opts.level) OPTIONS.level = opts.level;
}

module.exports.create = (session, input, request) =>
{
    if (!session) return;    
    if (OPTIONS.enable == true)
    {
        /*
        let raw = LogRaw.replace('$method', request.method)
                          .replace('$url', request.url)
                          .replace('$header', JSON.stringify(request.headers, null, 4))
                          .replace('$body', JSON.stringify(request.body, null, 4))
        */
       let log = new Log();
       log.endpoint = Base.getServiceName(request);
       log.method = request.method;
       log.address = Base.getRemoteAddress(request);
       //log.request.headers = request.headers;
       log.request.query = request.query;
       log.request.params = request.params;
       log.request.body = request.body;
       log.request.time.start = new Date();
       session.LogStorage = log; //streamFromString(raw);
    }
}

module.exports.done = (log, output, response) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true)
    {
        /*
        let raw = log.replace('$statusCode', response.statusCode)
                     .replace('$output', JSON.stringify(output, null, 4));
        */
        log.request.time.end = new Date();   
        log.request.time.duration = Math.abs((log.request.time.start.getTime() - log.request.time.end.getTime()));            
        log.response.statusCode = (response) ? response.statusCode: 200;
        log.response.output = output;
    }
}

module.exports.failed = (log, exception, response) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) 
    {
        log.request.time.end = new Date();     
        log.request.time.duration = Math.abs((log.request.time.start.getTime() - log.request.time.end.getTime()));
        log.logs.push({ time: new Date(), level: "error", message: exception.stack });
        log.response.statusCode = (response) ? response.statusCode: 500;
        log.response.output = exception.message;        
    }
}

module.exports.error = (log, exception) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true)
    {
        log.logs.push({ time: new Date(), level: "error", message: exception.stack });
    }
}

module.exports.info = (log, message) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true)
    {
        //log.logs.push({ time: new Date(), level: "info", message: message });
    }
}

module.exports.debug = (log, message) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) // && OPTIONS.level == "debug") 
    {
        log.logs.push({ time: new Date(), level: "debug", message: message });        
    }
}

module.exports.warn = (log, message, exception) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) 
    {
        message = (exception) ? exception : message;
        log.logs.push({ time: new Date(), level: "warn", message: message });                
    }
}

module.exports.log = (log, level, message) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true)
    {
        log.logs.push({ time: new Date(), level: level, message: message });                        
    }
}