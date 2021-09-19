'use strict'
const AWS = require('aws-sdk');
const SSM = require('aws-param-store');
const config = require('../../config/env.json');

var credentials = new AWS.Credentials({
    accessKeyId: config.ssm.accessKeyId, 
    secretAccessKey: config.ssm.secretAccessKey
});

module.exports.getParameter = async function(path)
{
    let performanceMonitor = require('execution-time')();
    performanceMonitor.start();
    let parameter = await SSM.getParameter(path, { credentials: credentials, region: config.ssm.region } )
    let elapsed = performanceMonitor.stop();
    console.log(`Get AWS Parameter ${elapsed.words}`);
    return JSON.parse(parameter.Value);
}
