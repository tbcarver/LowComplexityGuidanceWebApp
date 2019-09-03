
require('dotenv').config();

const express = require("express");
const expressHandlebars = require("express-handlebars");
const path = require("path");
const directoryWalkerSync = require("./lib/core/fs/directoryWalkerSync");
const templateViewRenderer = require("./lib/coreVendor/handlebars/templateViewRenderer");

const app = express();
const port = process.env.PORT || 3000;
 
const handlebars = expressHandlebars.create({
    extname: ".hbs",
    layoutsDir:"server/app/layouts/",
    partialsDir:"server/app/partials/",
    defaultLayout:"main.layout.hbs"
});

app.engine("hbs", handlebars.engine);
app.set("view engine", "hbs");
app.set("views", "server/app")

app.use("/assets", express.static("./assets"));
app.use("/assets/vendor/fontawesome-free/5.9.0/", express.static("./node_modules/@fortawesome/fontawesome-free/css"));

directoryWalkerSync.walkDirectory("./app", null, null, function(filePathName, stats) {

    if (filePathName.endsWith(".controller.js")) {

        filePathName = path.resolve(filePathName);

        var controller = require(filePathName);

        if (controller && controller.initialize) {

            controller.initialize(app);
        }
    }
});

app.use(templateViewRenderer);

app.use(function(req, res) {

	res.sendFile(__dirname + '/assets/html/404.html');
});

app.listen(port, function() {

	console.log(`Server listening on port ${port}.`)
});