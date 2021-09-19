const express = require('express');
const bodyParser = require('body-parser');

const auth = require('./api/utility/auth');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const boot = require('./bootstrapper');
boot.startUp(app);
