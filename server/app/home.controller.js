
function initialize(app) {

    app.get("/", getHome);
    app.get("/index.html", getHome);
}

function getHome(req, res) {

    var model = {
        title: "my junky stuff",
        navbarLinkTitle: "Home"
    }

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;