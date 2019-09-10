
require('dotenv').config();

var express = require("express");
var acl = require('acl');

var app = express();

app.set("query parser", "simple");

acl = new acl(new acl.memoryBackend());
app.use(function(req, res, next) {
    req.acl = acl;
    next();
});

// NOTE: Order of app.use() is important

require("./init/middlewares").initialize(app, acl);
require("./init/authActiveDirectory").initialize(app, acl);
require("./init/handlebars").initialize(app, acl);
require("./init/routes").initialize(app, acl);

// 404 needs to be set at the very end of the routes
app.use(function(req, res) {
    res.status(404);
    res.render("errors/404.template.hbs", { title: "404" });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Server listening on port ${port}.`)
});