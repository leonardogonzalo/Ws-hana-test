const api = require('request');
const settings = require('../../settings');

function verifyToken(request)
{
    let token = request.headers["x-access-token"];
    console.log("Token: " + token);
    return new Promise(
        (done, reject) =>
        {
            if (settings.auth.enable == true)
            {
                api.post(
                    { 
                        headers: { "x-access-token": token },
                        uri: settings.auth.endpoint 
                    },
                    function(error, response, body)
                    {
                        console.log(error);
                        if (!error) 
                        {
                            let result = JSON.parse(response.body);
                            console.log(result);
                            if (result.auth == true) { done(); }
                            else { reject(result.message); }
                        } 
                        else 
                        {
                            reject("Error in Authorization");
                        }
                    }
                );
            }
            else
            {
                done();
            }
        }
    );   

}

module.exports = { verifyToken: verifyToken }