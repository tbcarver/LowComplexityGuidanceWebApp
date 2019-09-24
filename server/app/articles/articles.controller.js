
var articlesStore = require("../../store/articlesStore");
var coreString = require("../../lib/core/extensions/coreString");

function initialize(app, acl) {

    acl.allow(["contributor"], "/article/new", "*");
    app.get("/article/new", getNew);
    app.post("/article/new", postNew);

    acl.allow(["contributor"], "/article/edit/:articleId", "*");
    app.get("/article/edit/:articleId", getEdit);
    acl.allow(["contributor"], "/article/edit", "*");
    app.post("/article/edit", postEdit);

    acl.allow("public exact", "/article/:articleId", "*");
    app.get("/article/:articleId", getArticle);
}

function getNew(req, res) {

    var model = new AppModel(req, "New Article", "New Article");

    res.render("articles/articlesDetailsEdit.template.hbs", model);
};

function postNew(req, res) {

    var articleId = articlesStore.addArticle(req.body.title, req.body.articleDescription, req.body.body, req.user.userId);

    req.params.articleId = articleId;
    getArticle(req, res);
};

function getEdit(req, res) {

    var article = articlesStore.getArticle(req.params.articleId);
    var pageTitle = "Edit " + coreString.truncate(article.title, 10, true);

    var model = new AppModel(req, pageTitle);
    model.article = article;

    res.render("articles/articlesDetailsEdit.template.hbs", model);
};

function postEdit(req, res) {

    var articleId = articlesStore.addArticle(req.body.title, req.body.articleDescription, req.body.body, req.user.userId);

    req.params.articleId = articleId;
    getArticle(req, res);
};

function getArticle(req, res) {

    var article = articlesStore.getRelationalArticle(req.params.articleId);
    var pageTitle = coreString.truncate(article.title, 10, true);

    var model = new AppModel(req, pageTitle);
    model.article = article;

    res.render("articles/articlesDetails.template.hbs", model);
};


module.exports.initialize = initialize;