
function initialize(router) {

    router.get("/", getHome);
    router.get("/index.html", getHome);
}

function getHome(req, res) {

    var model = {
        title: "conduit",
        navbarLinkTitle: "Home"
    }

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;