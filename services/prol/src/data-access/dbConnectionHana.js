'use strict'

const logger = require('./../utility/Logger');
const hdbPool = require('node-hdb-pool');
const settings = require('../../settings');

var hpool = hdbPool.createPool({
    host: settings.db.host,
    env: settings.db.env,
    port: settings.db.port,
    user: settings.db.user,
    password: settings.db.pass,
    maxPoolSize: settings.db.maxPoolSize,
    minPoolSize: settings.db.minPoolsize, 
    idleTimeoutMillis: settings.db.idleTimeoutMillis,
    refreshIdle: settings.db.refreshIdle  
});

module.exports.pool = function()
{ 
    return hpool;
}

module.exports.execute = function(statement, params, name, singleRecord)
{
    //logger.debug(statement);
    //logger.debug(name + ":" + JSON.stringify(params));
    let promise = new Promise((done, reject) =>
    {
        if(hpool) 
        { 
            //let performanceMonitor = logger.debugStart();            
            let response = undefined;
            hpool.exec(statement, params, 
                (error, data) =>
                {
                    //logger.debugStop(name + " completed ", performanceMonitor);
                    if (error) 
                    { 
                        console.log("Error Query " + name);
                        logger.error(error); 
                        reject(error) 
                    };
                    //logger.debug(data);
                    if (response == false)
                    {
                        reject(new Error("Query Timeout"));
                    }
                    else
                    {
                        response = true;

                        if (singleRecord == true)
                        {
                            //devuelve solo un registro
                            done( ((data) && Array.isArray(data) && data.length > 0 ) ? data[0] : null );
                        }
                        else
                        {
                            //devuelve todos los registros
                            done(data);
                        }
                    }
                }
            )

            setTimeout(
                function ()
                { 
                    if (response === undefined) 
                    { 
                        response = false; 
                    } 
                }                        
                , settings.db.timeOut
            );
        }
        else
        {
            //logger.error(mensajes.Error.HDB_POOL);
            reject(mensajes.Error.HDB_POOL);
        }
    });

    return promise;
}