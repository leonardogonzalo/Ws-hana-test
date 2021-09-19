const FileSystem = require('fs');
const Base = require('./LogBaseAppender');

const OPTIONS = 
                {
                    enable: true,    
                    path: "./logs/",
                    level: "info"
                }

const writeFile = (level, requestId, line) =>
{
    return new Promise(
        (done, reject) =>
        {
            let content = level + ' ' + line + '\r\n';
            FileSystem.writeFile(OPTIONS.path + requestId + '.log', content, { flag: 'a+' }, 
             (error) =>
             {
                if (error) { console.error(error); }
             
                done();
             }
            );
        }
    );
}

module.exports.configure = (opts) =>
{
    if (opts)
    {
        if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
        if (opts.path) OPTIONS.path = opts.path;
        if (opts.level) OPTIONS.level = opts.level;
    }
}

module.exports.input = (requestId, input, request) =>
{
    if (OPTIONS.enable == true) 
    {
        let requestInput = Base.getInput(request, input);   
        let line = (requestInput) ? JSON.stringify(requestInput, null, 4) : '';
        writeFile("info", requestId, line).then();
    }
}

module.exports.output = (requestId, output, response) =>
{
    if (OPTIONS.enable == true) 
    {
        let line = (output) ? JSON.stringify(output, null, 4) : '';
        writeFile("info", requestId, line).then();
    }
}

module.exports.info = (requestId, line) =>
{
    if (OPTIONS.enable == true) writeFile("info", requestId, line).then();
}

module.exports.debug = (requestId, line) =>
{
    if (OPTIONS.enable == true && OPTIONS.level == "debug") writeFile("debug", requestId, line).then();
}

module.exports.error = (requestId, exception) =>
{
    if (OPTIONS.enable == true) 
    {
        let line = JSON.stringify(exception, null, 4);
        writeFile("error", requestId, line).then();
    }
}

module.exports.warn = (requestId, line) =>
{
    if (OPTIONS.enable == true) writeFile("warn", requestId, line).then();
}

module.exports.log = (requestId, level, line) =>
{
    if (OPTIONS.enable == true) writeFile("log", level, requestId, line).then();
}