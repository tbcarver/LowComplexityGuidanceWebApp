
var passport = require("passport");

function initialize(app, acl) {
    
    acl.allow(["administrator"], "/editor/:article?", "*");
    app.get("/editor/:article?", getEditor);
}

/** @param { Request } req @param { Response } res */
function getEditor(req, res) {
    
    var model = new AppModel(req, "New Article", "New Article");
    
    res.render("article-editor.template.hbs", model);
};


module.exports.initialize = initialize;