
function initialize(app) {

    app.get("/", getHome);
    app.get("/index.html", getHome);
}

function getHome(req, res) {

    var model = {
        title: "my junky stuff",
        junk: {
            stuff: "my junky stuff"
        },
        otherStuff: "asdfasdfasdfasdfdfs"
    }

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;