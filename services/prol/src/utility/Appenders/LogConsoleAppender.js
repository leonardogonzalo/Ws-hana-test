const Base = require('./LogBaseAppender');

const OPTIONS = 
                {
                    enable: true,    
                    level: "info"
                }

const write = (level, uuid, message, exception) =>
{
    if (OPTIONS.enable == true
        || (OPTIONS.enable == true && level == "debug" && OPTIONS.level == "debug"))
    {
        if (!uuid) uuid = "?";
        if (!message) message = "";
        let time = JSON.stringify(new Date());
        console.log(level, `${time} ${level} ${uuid} ${message}`);
        if (exception)
        {
            console.error(exception);
        }        
    }
}

module.exports.configure = (opts) =>
{
    if (opts.enable || opts.enable == false) OPTIONS.enable = opts.enable;
    if (opts.level) OPTIONS.level = opts.level;
}

module.exports.info = (uuid, message) =>
{
    //if (OPTIONS.enable == true) console.info(message);
    write("info", uuid, message);
}

module.exports.debug = (uuid, message) =>
{
    //if (OPTIONS.enable == true && OPTIONS.level == "debug") console.debug(message);
    write("debug", uuid, message);
}

module.exports.error = (uuid, exception) =>
{
    //if (OPTIONS.enable == true) console.error(exception);
    write("error", uuid, null, exception);
}

module.exports.warn = (uuid, message, exception) =>
{
    //if (OPTIONS.enable == true) console.warn(message);
    write("warn", uuid, message, exception);
}

module.exports.log = (uuid, level, message) =>
{
    //if (OPTIONS.enable == true) console.log(level, message);
    write(level, uuid, message);
}