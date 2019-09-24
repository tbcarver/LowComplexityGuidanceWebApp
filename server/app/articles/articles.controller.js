
var articlesStore = require("../../store/articlesStore");
var coreString = require("../../lib/core/extensions/coreString");

function initialize(app, acl) {

    acl.allow(["contributor"], "/editor/:article?", "*");
    app.get("/editor/:article?", getEditor);
    acl.allow(["contributor"], "/editor", "*");
    app.post("/editor", postEditor);

    acl.allow("public match", "/article", "*");
    app.get("/article/:articleId", getArticle);
}

/** @param { Request } req @param { Response } res */
function getEditor(req, res) {

    var model = new AppModel(req, "New Article", "New Article");

    res.render("articles/articlesEditor.template.hbs", model);
};

/** @param { Request } req @param { Response } res */
function postEditor(req, res) {

    var articleId = articlesStore.addArticle(req.body.title, req.body.articleDescription, req.body.body, req.user.userId);

    req.params.articleId = articleId;
    getArticle(req, res);
};

/** @param { Request } req @param { Response } res */
function getArticle(req, res) {

    var article = articlesStore.getArticle(req.params.articleId);
    var pageTitle = coreString.truncate(article.title, 10, true);

    var model = new AppModel(req, pageTitle);

    res.render("articles/articlesDetails.template.hbs", article);
};


module.exports.initialize = initialize;