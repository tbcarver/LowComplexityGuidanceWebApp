
function initialize(app, acl) {
    
    acl.allow(["contributor"], "/editor/:article?", "*");
    app.get("/editor/:article?", getEditor);
}

/** @param { Request } req @param { Response } res */
function getEditor(req, res) {
    
    var model = new AppModel(req, "New Article", "New Article");
    
    res.render("articleEditor.template.hbs", model);
};


module.exports.initialize = initialize;