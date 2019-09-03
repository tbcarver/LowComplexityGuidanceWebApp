
require('dotenv').config();

const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const directoryWalkerSync = require("./lib/core/fs/directoryWalkerSync");

const app = express();
const port = process.env.PORT || 3000;

const handlebars = expressHandlebars.create({
    extname: ".hbs",
    layoutsDir: "server/app/layouts/",
    partialsDir: "server/app/partials/",
    defaultLayout: "main.layout.hbs"
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", "server/app")

app.use("/assets", express.static("./assets"));
app.use("/assets/vendor/bootstrap/4.3.1/", express.static("./node_modules/bootstrap/dist"));
app.use("/assets/vendor/fontawesome-free/5.9.0/", express.static("./node_modules/@fortawesome/fontawesome-free"));
app.use("/assets/vendor/jquery/3.3.1/", express.static("./node_modules/jquery/dist"));

directoryWalkerSync.walkDirectory("./server/app", null, null, function(filePathName, stats) {

    if (filePathName.endsWith(".controller.js")) {

        var absoluteFilePathName = path.resolve(filePathName);
        var routes = require(absoluteFilePathName);

        if (routes && routes.initialize) {

            var router = express.Router();

            routes.initialize(router);
            app.use(router);
        }
    }
});

app.use(function(req, res) {
    res.render("errors/404.template.hbs", { title: "404" });
});

app.listen(port, function() {

    console.log(`Server listening on port ${port}.`)
});