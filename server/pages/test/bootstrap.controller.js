
function initialize(app, acl) {
    
    // Acl noop
    app.get("/test/bootstrap", getBootstrap);
}

function getBootstrap(req, res, next) {

	res.render("test/bootstrap.template.hbs");
};


module.exports.initialize = initialize;