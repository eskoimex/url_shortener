'use strict';
//import express module
const express = require('express');

//Call the express function to initiate an express app
const app = express();

// Initialize express bodyparser
app.use(express.json());

//Import config module
const config = require('./config');

//Import db.util module
const db = require('./utils/db.util.js');

//Connect to database by calling our connect method
db.connect();

//ROUTES
const shortUrlRoute = require('./routes/url_shortener_service.route');

//API Route Enpoint
app.use('/', shortUrlRoute.routes);


module.exports = app.listen(config.port, () => console.log(`${config.name} is listening on url http://localhost:` + config.port));
