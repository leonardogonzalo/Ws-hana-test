'use strict'
const SSM = require('./api/utility/ssm');

let configuration;

module.exports =
{

    initialize: async function()
    {
        let parameter = await SSM.getParameter('prol_dev');
        console.log("Environment: ", process.env.NODE_ENV);
        if (parameter && process.env.NODE_ENV != 'dev')
        {
            console.log("AWS Configuration");
            //console.log(JSON.stringify(parameter, null, 4));
            configuration = parameter;
        }
        else
        {
            console.log("AWS Configuration Local");
            configuration = require('./config/default.json');
        }
    },

    app:
    {
        get secure() { return configuration.service.secure; },            
        get certificates() { return configuration.service.certificates; }
    },    

    log:
    {
        get application() { return configuration.service.name; },            
        get enable() { return configuration.log.enable; },
        get api() { return configuration.log.api; },
        get detail() { return configuration.log.detail; },
        get level() { return configuration.log.level; },
        get compress() { return configuration.log.compress; },        
        get progress() { return configuration.log.progress; },                
        get localContingency() { return configuration.log.localContingency; }        
    },

    get db() { return configuration.db; }    

}