'use strict'
const zlib = require('zlib');
const Buffer = require('buffer').Buffer;

module.exports.compress = async (raw) =>
{
    let statementPromise = new Promise(
        (done, reject) =>
        {
            zlib.deflate(raw, 
                (error, buffer) => 
                {
                    if (error) 
                    { 
                        console.log("Error Compress Log");
                        console.error(error)
                        reject(error);
                    }
        
                    done(buffer.toString('base64'));
                });
        }
    );

    return statementPromise;
}

module.exports.gzip = async(json) =>
{
    return new Promise(
        (done, reject) =>
        {
            let buffer = new Buffer.from(JSON.stringify(json, null, 4));
            zlib.gzip(buffer, 
                      (error, zippedData) =>
                    {
                        if (error) 
                        {
                            console.log("error in gzip compression", error);
                            reject(error);
                        } 
                        else 
                        {
                            console.log("zippedData", zippedData);
                            done(zippedData);
                        }
                    });
        }
    )
};

module.exports.gunzip = async(stream) =>
{
    return new Promise(
        (done, reject) =>
        {
            zlib.gunzip(stream, 
                (error, buffer) => 
                {
                    if (error) 
                    { 
                        console.log("Error Decompress Log");
                        console.log(error);
                        reject(error)
                    } 
                    done(buffer.toString());
                });   
        }
    )
}

module.exports.decompress = async(raw) =>
{
    let statementPromise = new Promise(
        (done, reject) =>
        {
            const buffer = Buffer.from(raw, 'base64');
            zlib.unzip(buffer, 
                (error, buffer) => 
                {
                    if (error) 
                    { 
                        console.log("Error Decompress Log");
                        console.log(error);
                        reject(error)
                    } 
                    done(buffer.toString());
                });
        }
    );

    return statementPromise;
}