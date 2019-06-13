
const express = require("express");
const expressHandlebars = require("express-handlebars");

const dotenv = require('dotenv');
dotenv.load();

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
app.set("views", "server/app/views")

app.use(express.static("./assets"));
app.use("/vendor/bootstrap/4.3.1/", express.static("./node_modules/bootstrap/dist"));
app.use("/vendor/font-awesome/4.7.0/", express.static("./node_modules/font-awesome"));

app.use("/client", express.static("./client"));

app.get("/edit/:userId", express.static("./server/views/index.html"));

const challengesController = require("./app/challenges.controller");
challengesController(app);

app.use(function(req, res) {

	res.sendFile(__dirname + '/views/404.html');
});

app.listen(port, function() {

	console.log(`User management app listening on port ${port}.`)
});