
require('dotenv').config();

const winston = require('winston');
const ServerError = require('./serverError');
const express = require("express");
const Acl = require('acl');

const logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [

        // Write all logs error and below
        new winston.transports.File({ filename: './logs/error.log', level: 'error', handleExceptions: true }),

        // Write to all logs
        new winston.transports.File({ filename: './logs/all.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({ handleExceptions: true }));
}

// NOTE: There are 2 globals in this app: logger and ServerError.
global.logger = logger;
global.ServerError = ServerError;

const app = express();

app.set("query parser", "simple");

const acl = new Acl(new Acl.memoryBackend());
app.use(function(req, res, next) {
    req.acl = acl;
    next();
});

// NOTE: Order of app.use() is important

require("./init/middlewares").initialize(app, acl);
require("./init/authActiveDirectory").initialize(app, acl);
require("./init/handlebars").initialize(app, acl);
require("./init/routes").initialize(app, acl);
require("./init/errors").initialize(app, acl);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Server listening on port ${port}.`)
});