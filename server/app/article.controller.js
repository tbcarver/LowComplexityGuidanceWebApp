
var passport = require("passport");

function initialize(app, acl) {
    
    acl.allow("InfoNet Admins", "/editor/:article", "*");
    app.get("/editor/:article", getEditor);
}

function getEditor(req, res) {

    var model = {
        title: "New Article",
        navbarLinkTitle: "New Article"
    }

    res.render("article-editor.template.hbs", model);
};


module.exports.initialize = initialize;