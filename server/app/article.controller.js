
var passport = require("passport");

function initialize(router) {

    // router.get("/editor", passport.authenticate('ActiveDirectory', {
	// 	successRedirect: '/',
	// 	failureRedirect: '/login'
    // }), getEditor);
    
    

    router.get("/editor", getEditor);
}

function getEditor(req, res) {

    req.isAuthenticated()

    var model = {
        title: "New Article",
        navbarLinkTitle: "New Article"
    }

    res.render("article-editor.template.hbs", model);
};


module.exports.initialize = initialize;