
module.exports.getServiceName = (request) =>
{
    let serviceName = request.url;
    let urlSeparator = '/';
    if ((serviceName) && serviceName.startsWith(urlSeparator)) serviceName = serviceName.substr(urlSeparator.length, serviceName.length);

    let urlParts = serviceName.split(urlSeparator);
    let urlBaseParts = [];
    /* //No funciona bien cuando hay parametros opcionales en el url
    let countParams = Object.keys(request.params).length;
    for (let index = 0; index < urlParts.length - countParams; index++)
    {
        urlBaseParts.push(urlParts[index]);
    }
    serviceName = urlBaseParts.join(urlSeparator);
    */
    serviceName = urlParts[0];
    return serviceName;
}

module.exports.getRemoteAddress = (request) =>
{
    return request.headers['x-forwarded-for'] || 
                    request.connection.remoteAddress || 
                    request.socket.remoteAddress ||
                    (request.connection.socket ? request.connection.socket.remoteAddress : null); 
}

module.exports.getInput = (request, input) =>
{
    return (input) ? input : ((request.body) && Object.keys(request.body).length > 0) ? request.body: request.params;  
}