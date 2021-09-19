const settings = require('./settings');
const logger = require('./api/utility/Logger');
const routes = require('./api/routes/ValidacionesRoutes');

module.exports.startUp = function(app)
{
    console.log("StartUp Configuration");
    settings.initialize().then(
        () =>
        {
            logger.configure(settings.log);

            routes(app);

            const PORT = process.env.PORT || 7000;            
            if (Settings.app.secure == false)
            {            
                //Insecure
                app.listen(PORT, () => logger.console(`Execute BELCORP Service PROL: ${PORT}!`));
            }
            else
            {
                //Secure
                const fs = require('fs'); 
                const https = require('https'); 
                const OPTIONS = { 
                                    key: fs.readFileSync(`${settings.app.certificates}server-key.pem`), 
                                    cert: fs.readFileSync(`${settings.app.certificates}server-crt.pem`), 
                                    ca: fs.readFileSync(`${settings.app.certificates}ca-crt.pem`),
                                    requestCert: false, 
                                    rejectUnauthorized: false
                                };     
                https.createServer(OPTIONS, app).listen(PORT, ()=> console.log(`PROL Service started ${PORT}`));
            }

        }
    );
}