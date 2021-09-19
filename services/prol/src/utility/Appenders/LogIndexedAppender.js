const Base = require('./LogBaseAppender');

const OPTIONS = 
                {
                    application: "",
                    enable: true,    
                    level: "info"
                }

class Log
{

    constructor(application, service)
    {
        this.app = application;
        this.servicio = service; 
        this.codigoPais = null;
        this.estadoEjecucion = "Iniciada";  //Iniciada|EnProgreso|Terminada|Fallida
        this.tipoEjecucion = "Manual";      //Manual|Automatico
        this.usuarioEjecucion = "Token";    
        this.fechaInicio = new Date();
        this.fechaFin = null;
        this.elapsed = null;
        this.input = {};
        this.detalle = [];
        this.statusCode = null;
        this.output = {};        
    }

}                

module.exports.configure = (opts) =>
{
    if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
    if (opts.application) OPTIONS.application = opts.application;
    if (opts.service) OPTIONS.service = opts.service;
}

module.exports.create = (session, input, request) =>
{
    if (!session) return;    
    if (OPTIONS.enable == true) 
    {
        let log = new Log(OPTIONS.application, Base.getServiceName(request));
        //let requestInput = (input) ? input : ((request.body) && Object.keys(request.body).length > 0) ? request.body: request.params;  
        let requestInput = Base.getInput(request, input);
        log.usuarioEjecucion = Base.getRemoteAddress(request);
        log.codigoPais = request.body.codigoPais || request.body.codPais || request.params.codigoPais || request.params.codPais;
        log.input = requestInput;  
        session.LogIndexed = log;
    }
}

module.exports.done = (log, output, response) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) 
    {
        log.estadoEjecucion = "Terminada";
        log.fechaFin = new Date();
        let ms = Math.abs((log.fechaInicio.getTime() - log.fechaFin.getTime()));
        let sec = Math.abs(ms / 1000);
        log.elapsed = Number.parseInt(ms); 
        log.statusCode = (response) ? response.statusCode: 200;
        log.output = output;        
    }
}

module.exports.failed = (log, exception, response) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) 
    {
        if (log)
        {
            log.estadoEjecucion = "Fallida";
            log.fechaFin = new Date();

            let ms = Math.abs((log.fechaInicio.getTime() - log.fechaFin.getTime()));
            let sec = Math.abs(ms / 1000);
            log.elapsed = Number.parseInt(ms); 
            log.detalle.push({ 
                                fechaEjecucion: log.fechaFin,
                                tipoEvento: "error", 
                                mensaje: (exception.message) ? exception.message: exception
                            });

            log.statusCode = (response) ? response.statusCode: 500;
            log.output = exception.stack; 
        }        
    }
}

module.exports.error = (log, exception) =>
{
    if (!log) return;
    if (OPTIONS.enable == true) 
    {
        if (exception)
        {
            log.detalle.push({ 
                fechaEjecucion: new Date(), 
                tipoEvento: "error", 
                mensaje: (exception.message) ? exception.message: exception
            });        
        }
    }
}

module.exports.info = (log, message) =>
{
    if (!log) return;
    if (OPTIONS.enable == true) 
    {
        if (message)
        {
            log.detalle.push({ 
                fechaEjecucion: new Date(), 
                tipoEvento: "info", 
                mensaje: message 
            });        
        }
    }
}

module.exports.debug = (log, message) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true && OPTIONS.level == "debug") 
    {
        log.detalle.push({ 
            fechaEjecucion: new Date(), 
            tipoEvento: "debug", 
            mensaje: message 
        });   
    }
}

module.exports.warn = (log, message) =>
{
    if (!log) return;    
    if (OPTIONS.enable == true) 
    {
        log.detalle.push({ 
            fechaEjecucion: new Date(), 
            tipoEvento: "warn", 
            mensaje: message 
        });   
    }
}
