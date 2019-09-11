
function initialize(app, acl) {
    
    acl.allow('public exact', "/", '*');
    app.get("/", getHome);
}

/** @param { Request } req @param { Response } res */
function getHome(req, res) {

    var model = {
        title: "conduit",
        navbarLinkTitle: "Home"
    }

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;