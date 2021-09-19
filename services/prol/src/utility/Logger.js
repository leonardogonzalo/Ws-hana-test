'use strict'
//Funcion: Armar y enviar la trama resumida al API LOG 
//y guardar el detalle del request en un filestream
const CreateNamespace = require('cls-hooked').createNamespace;
const Namespace = "NamespaceLOG";
const RequestNamespace = CreateNamespace(Namespace);
const GetNamespace = require('cls-hooked').getNamespace;
const UUID = require('node-uuid');

const LogIndexedAppender = require('./Appenders/LogIndexedAppender');
const LogFileAppender = require('./Appenders/LogFileAppender');
const LogConsoleAppender = require('./Appenders/LogConsoleAppender');
const LogBatchAppender = require('./Appenders/LogBatchAppender');
const LogAgent = require('./LogAgent');

const OPTIONS = 
{
    application: "Application Name",
    api: "http://localhost/",
    enable: true,
    enableIndexed: true,
    level: "info",          
    progress: false,         //Envia al repositorio central conforme se van dando los messages
    compress: false         //Envia los mensajes comprimidos solo cuando progress es false
};

async function createSession(namespace, request)
{
    //Obtener el Id Session desde el LogServer
    let requestId = UUID.v1(); //await LogAgent.createSession();

    //Verificar si se pudo obtener correctamente la sesion desde el logServer
    let offline = false;
    if (!requestId) 
    {
        offline = true;
        requestId = UUID.v1();
    }

    let session =   {
                        RequestId: requestId,
                        LogIndexed: null,
                        LogStorage: null,
                        Offline: offline
                    };

    namespace.set('Session', session);  
   return session;
}

function getSession()
{
    let RequestNamespace = GetNamespace(Namespace);
    let session = RequestNamespace && RequestNamespace.get('Session') ? RequestNamespace.get('Session') : "";
   return session;
}

const updateSession = (session) =>
{
    let RequestNamespace = GetNamespace(Namespace);    
    if (session && RequestNamespace && RequestNamespace.active)
    {
        RequestNamespace.set('Session', session);      
    }
}

const Logger = 
{
    configure: (opts) =>
    {
        if (!opts) opts = {}        
        if (opts.application) OPTIONS.application = opts.application;
        if (opts.api) OPTIONS.api = opts.api;
        if (opts.level) OPTIONS.level = opts.level;
        if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
        if (opts.compress || opts.compress == false) OPTIONS.compress = opts.compress;    
        if (opts.progress || opts.progress == false) OPTIONS.progress = opts.progress;    
        if (opts.localContingency || opts.localContingency == false) OPTIONS.localContingency = opts.localContingency;
        LogAgent.configure({ api: OPTIONS.api, compress: OPTIONS.compress, progress: OPTIONS.progress, localContingency: OPTIONS.localContingency });
        LogIndexedAppender.configure({ enable: OPTIONS.enable, application: OPTIONS.application });
        LogFileAppender.configure({ enable: OPTIONS.enable, level: OPTIONS.level });
        LogBatchAppender.configure({});
        LogConsoleAppender.configure({});
    },
    getIdSession: () =>
    {
        let session = getSession();
        return session.RequestId;
    },
    create: (request, next, parseInput) =>  //Request recibido
    {
        RequestNamespace.run(async() =>
        {
            let session = await createSession(RequestNamespace, request);
            if (OPTIONS.progress != true)
            {
                let input = (parseInput) ? parseInput(request): request.Body; 
                LogIndexedAppender.create(session, input, request);
                LogConsoleAppender.info(session.RequestId, `New Request`);                 
            }
            else
            {
                LogAgent.send(LogBatchAppender.create(session, parseInput, request), session);
            }
            next();
        });
    },
    done: (message, response, output, performanceMonitor) => //Request atendido
    { 
        //let timeElapsed = performanceMonitor.stop(); // se calcula con fecha inicio y fecha fin
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {
                if (OPTIONS.enable == true)
                {
                    if (OPTIONS.progress != true)
                    {
                        LogIndexedAppender.done(session.LogIndexed, output, response);
                        LogConsoleAppender.info(session.RequestId, `${message} (${session.LogIndexed.elapsed} ms)`);                
                        LogAgent.save(session);                     
                    }
                    else
                    {
                        LogAgent.send(LogBatchAppender.done(session), session);
                    }
                }
                done();
            }
        ).then().catch();
    },   
    failed: (exception, response) => //Request fallido
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {        
                if (OPTIONS.progress != true)
                {
                    LogIndexedAppender.failed(session.LogIndexed, exception, response);
                    LogConsoleAppender.error(session.RequestId, exception);                      
                    LogAgent.save(session);                     
                }
                else
                {
                    LogAgent.send(LogBatchAppender.failed(session, exception), session);
                }
                done();
            }
        ).then().catch();
    },     
    error: (exception) => //Request fallido
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {        
                if (OPTIONS.progress != true)
                {
                    LogIndexedAppender.error(session.LogIndexed, exception);
                    LogConsoleAppender.error(session.RequestId, exception);  
                }
                else
                {
                    LogAgent.send(LogBatchAppender.info(session, exception), session);                            
                }
                done();
            }
        ).then().catch();
    },    
    start: (message) =>
    {
        let performanceMonitor = require('execution-time')();
        performanceMonitor.start();
        let session = getSession();
        if (message)
        {
            let statementPromise = new Promise(
                (done, reject) =>
                {    
                    if (OPTIONS.progress != true)
                    {         
                        LogIndexedAppender.info(session.LogIndexed, `${message}`);
                        LogConsoleAppender.info(session.RequestId, `${message}`);
                    }
                    else
                    {
                        LogAgent.send(LogBatchAppender.info(session, message), session);
                    }
                    done();
                }
            ).then().catch();
        }
        return performanceMonitor;
    },
    stop: (message, performanceMonitor) =>
    {
        let timeElapsed = performanceMonitor.stop();
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {         
                if (OPTIONS.progress != true)
                {                  
                    LogIndexedAppender.info(session.LogIndexed, `${message} (${timeElapsed.words})`);
                    LogConsoleAppender.info(session.RequestId, `${message} (${timeElapsed.words})`);    
                }
                else
                {
                    LogAgent.send(LogBatchAppender.info(session, message), session);
                }                
                done();
            }
        ).then().catch();
        //).then(() => updateSession(session) );
    },
    debugStart: (message) =>
    {
        if (OPTIONS.level == "debug")
        {
            let performanceMonitor = require('execution-time')();
            performanceMonitor.start();
            let session = getSession();
            if (message) 
            {
                let statementPromise = new Promise(
                    (done, reject) =>
                    {                 
                        if (OPTIONS.progress != true)
                        {
                            LogIndexedAppender.debug(session.LogIndexed, `${message}`);   
                            LogConsoleAppender.debug(session.RequestId, `${message}`);
                        }
                        else
                        {
                            LogAgent.send(LogBatchAppender.debug(session, message), session);
                        }
                        done();
                    }
                ).then().catch();
            }
            return performanceMonitor;
        }
        return null;
    },    
    debugStop: (message, performanceMonitor) =>
    {
        if (OPTIONS.level == "debug")
        {        
            let timeElapsed = performanceMonitor.stop();
            let session = getSession();
            let statementPromise = new Promise(
                (done, reject) =>
                {           
                    if (OPTIONS.progress != true)   
                    {
                        LogIndexedAppender.debug(session.LogIndexed, `${message} (${timeElapsed.words})`);
                        LogConsoleAppender.debug(session.RequestId, `${message} (${timeElapsed.words})`);
                    }
                    else
                    {
                        LogAgent.send(LogBatchAppender.debug(session, message), session);                    
                    }
                    done();
                }
            ).then().catch();
        }
    },    
    debugError: (exception) =>
    {
        if (OPTIONS.level == "debug")
        {          
            let session = getSession();
            let statementPromise = new Promise(
                (done, reject) =>
                { 
                    if (OPTIONS.progress != true)
                    {
                        LogIndexedAppender.error(session.LogIndexed, exception);
                        LogConsoleAppender.error(session.RequestId, exception); 
                    }
                    else
                    {
                        LogAgent.send(LogBatchAppender.error(session, exception), session);
                    }
                    done();
                }
            ).then().catch();
        }
    },    
    console: (message) =>
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {    
                LogConsoleAppender.info(session.RequestId, message);
                done();
            }
        ).then().catch();
    },      
    info: (message) =>
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {    
                if (OPTIONS.progress != true)      
                {
                    LogIndexedAppender.info(session.LogIndexed, message);
                    LogConsoleAppender.info(session.RequestId, message);
                }
                else
                {
                    LogAgent.send(LogBatchAppender.info(session, message), session);                                        
                }
                done();
            }
        ).then().catch();
        //).then(() => updateSession(session));  
    },    
    warn: (message, exception) =>
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {     
                if (OPTIONS.progress != true)
                {
                    LogIndexedAppender.warn(session.LogIndexed, message, exception);     
                    LogConsoleAppender.warn(session.RequestId, message, exception);
                }
                else
                {
                    LogAgent.send(LogBatchAppender.warn(session, messasge), session);
                }
                done();
            }
        ).then().catch();
    },
    debug: (message) =>
    {
        let session = getSession();
        let statementPromise = new Promise(
            (done, reject) =>
            {   
                if (OPTIONS.progress != true)
                {
                    LogIndexedAppender.debug(session.LogIndexed, message);       
                    LogConsoleAppender.debug(session.RequestId, message);
                }
                else
                {
                    LogAgent.send(LogBatchAppender.debug(session, message), session);
                }
                done();
            }
        ).then().catch();
    }
};

module.exports = Logger; 
