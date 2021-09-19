const Base = require('./LogBaseAppender');

const OPTIONS = 
                {
                    enable: true,    
                    level: "info"
                }

const getNow = () =>
{
    let data = JSON.stringify({ datetime: new Date() });
    return JSON.parse(data).datetime;
}

module.exports.configure = (opts) =>
{
    if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
    if (opts.level) OPTIONS.level = opts.level;
}

module.exports.create = (session, input, request) =>
{
    let statement = 'create/:idInterfaz/:id/:time/:idPais/:user/:input/:type';
    let interface = Base.getServiceName(request);
    statement = statement.replace(':idInterfaz', request.params.idInterfaz || interface);
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':idPais', request.params.idPais || request.body.codigoPais || request.body.codPais);
    statement = statement.replace(':user', (request.params.user) ? request.params.user : 'user');    

    let inputs = Base.getInput(request, input);
    let parsedInput = '';
    if (inputs)
    {
        let keysInput = Object.keys(inputs);
        for(let key of keysInput)
        {
            if (key.toUpperCase() != "idsesion" && key.toUpperCase() != "idinterfaz" && key.toUpperCase() != "idpais")
            {
                parsedInput = parsedInput + ( (parsedInput.length > 0) ? ',' : '') + key + ':' + inputs[key];
            }
        }
    }

    statement = statement.replace(':input', parsedInput);
    statement = statement.replace(':type', 'Automatico');    
    return statement;
}

module.exports.done = (session) =>
{
    //app.get('/done/:id/:time', //update without details
    let statement = 'done/:id/:time';
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    return statement;
}
module.exports.failed = (session, exception) =>
{
    let statement = 'error/:id/:time/:message'; //update & add details error
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':message', exception.message);
    return statement;
}
module.exports.error = (session, exception) =>
{
    let statement = 'add/:id/:time/:event/:message'; //add info|log|debug|error to details of trama
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':event', 'error'); 
    statement = statement.replace(':message', exception.message);
    return statement;
}
module.exports.info = (session, message) =>
{
    let statement = 'add/:id/:time/:event/:message'; //add info|log|debug|error to details of trama
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':event', 'info'); 
    statement = statement.replace(':message', message);
    return statement;
}

module.exports.debug = (session, message) =>
{
    let statement = 'add/:id/:time/:event/:message'; //add info|log|debug|error to details of trama
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':event', 'debug'); 
    statement = statement.replace(':message', message);
    return statement;
}

module.exports.warn = (session, message) =>
{
    let statement = 'add/:id/:time/:event/:message'; //add info|log|debug|error to details of trama
    statement = statement.replace(':id', session.RequestId);
    statement = statement.replace(':time', getNow());
    statement = statement.replace(':event', 'warn'); 
    statement = statement.replace(':message', message);
    return statement;
}