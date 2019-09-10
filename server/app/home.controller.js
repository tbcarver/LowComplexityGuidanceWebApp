
function initialize(router, acl) {
    
    acl.allow('public exact', "/", '*');
    router.get("/", getHome);
}

function getHome(req, res) {

    var model = {
        title: "conduit",
        navbarLinkTitle: "Home"
    }

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;