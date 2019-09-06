
var passport = require("passport");

function initialize(router) {
    
    router.get("/editor/:article?", getEditor);
}

function getEditor(req, res) {

    var model = {
        title: "New Article",
        navbarLinkTitle: "New Article"
    }

    res.render("article-editor.template.hbs", model);
};


module.exports.initialize = initialize;