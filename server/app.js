
require("dotenv").config();

var winston = require("winston");
var customFormat = require("./lib/coreVendor/winston/customFormat");
var sqliteTransport = require("./lib/coreVendor/winston/sqliteTransport");
var ServerError = require("./serverError");
var express = require("express");
var Acl = require("acl");

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.timestamp(),
        customFormat),
    transports: [
        new sqliteTransport(),
    ],
});

if (process.env.LOG_TO_FILE === "true") {
    // Write errors and below
    logger.add(new winston.transports.File({ filename: "./logs/error.log", level: "error", handleExceptions: true }));

    // Write all
    logger.add(new winston.transports.File({ filename: "./logs/all.log" }));
}

if (process.env.NODE_ENV !== "production") {
    logger.add(new winston.transports.Console({ handleExceptions: true }));
}

// NOTE: Globals should be very minimal and used in about 90% of files.
global.logger = logger;
global.ServerError = ServerError;

const app = express();

app.set("query parser", "simple");

const acl = new Acl(new Acl.memoryBackend());
app.use(function(req, res, next) {
    req.acl = acl;
    next();
});


// NOTE: Order of initialize is important

require("./init/vendorMiddlewares").initialize(app, acl);
require("./init/auth").initialize(app, acl);
require("./init/handlebars").initialize(app, acl);
require("./init/development").initialize(app, acl, function() {
    require("./init/middlewares").initialize(app, acl);
    require("./init/routes").initialize(app, acl);
    require("./init/errors").initialize(app, acl);

    var port = process.env.PORT || 3000;

    app.listen(port, function() {
        console.log(`Server listening on port ${port}. http://localhost:${port}`);
    });
});