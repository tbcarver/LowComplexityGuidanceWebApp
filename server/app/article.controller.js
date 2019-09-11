
var passport = require("passport");

function initialize(app, acl) {
    
    acl.allow(["Tutor Developers", "InfoNet Curriculum Admins"], "/editor/:article?", "*");
    app.get("/editor/:article?", getEditor);
}

/** @param { Request } req @param { Response } res */
function getEditor(req, res) {

    var model = {
        title: "New Article",
        navbarLinkTitle: "New Article"
    }

    res.render("article-editor.template.hbs", model);
};


module.exports.initialize = initialize;