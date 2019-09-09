
require('dotenv').config();

var express = require("express");

var app = express();

app.set("query parser", "simple");

// NOTE: Order of app.use() is important

require("./init/middlewares").initialize(app);
require("./init/passportActiveDirectory").initialize(app);
require("./init/handlebars").initialize(app);
require("./init/routes").initialize(app);

// 404 needs to be set at the very end of the routes
app.use(function(req, res) {
    res.status(404);
    res.render("errors/404.template.hbs", { title: "404" });
});

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Server listening on port ${port}.`)
});