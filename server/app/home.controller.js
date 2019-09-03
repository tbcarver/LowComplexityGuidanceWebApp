
var homeController = {};

homeController.initialize = function(app) {

    app.get("/", function(request, response, next) {


        var handlebars = require("handlebars");

        var template = handlebars.compile("<h1>{{this}}</h1>");

        var html = template("HELLOOOOOO");

        response.send(html);





        // response.view = homeController.load();
        // next();
    });

    app.get("/index.html", function(request, response, next) {

        response.view = homeController.load();
        next();
    });
}

homeController.load = function() {

    var view = {};

    view.template = "home.template.hbs";
    view.model = {
        title: "my junky stuff",
        junk: {
            stuff: "my junky stuff"
        },
        otherStuff: "asdfasdfasdfasdfdfs"
    }

    return view;
};


module.exports = homeController;