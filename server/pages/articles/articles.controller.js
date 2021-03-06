
var articlesStore = require("../../store/articlesStore");
var coreString = require("../../../lib/core/extensions/coreString");

function initialize(app, acl) {

	acl.allow("public exact", "/article/view/:articleId", "*");
	app.get("/article/view/:articleId", getArticleView);

	acl.allow(["contributor"], "/article/new", "*");
	app.get("/article/new", getArticleNew);
	acl.allow(["contributor"], "/article/edit/:articleId", "*");
	app.get("/article/edit/:articleId", getArticleEdit);
	acl.allow(["contributor"], "/article/edit", "*");
	app.post("/article/edit", postArticleEdit);

	acl.allow(["contributor"], "/article/delete", "*");
	app.post("/article/delete", postArticleDelete);
}

function getArticleView(req, res) {

	var userId = req.user ? req.user.userId : null;

	var article = articlesStore.getExtendedArticle(req.params.articleId, userId);
	var pageTitle = coreString.truncate(article.title, 10, true);

	var model = { title: pageTitle };
	model.article = article;

	res.render("articles/articlesDetails.template.hbs", model);
}

function getArticleNew(req, res) {

	var model = { title: "New article", navbarLinkTitle: "New article" };

	res.render("articles/articlesDetailsEdit.template.hbs", model);
}

function getArticleEdit(req, res) {

	var article = articlesStore.getArticle(req.params.articleId);
	var pageTitle = "Edit " + coreString.truncate(article.articleTitle, 10, true);

	var model = { title: pageTitle };
	model.article = article;

	res.render("articles/articlesDetailsEdit.template.hbs", model);
}

function postArticleEdit(req, res) {

	if (req.body.articleId) {
		articlesStore.updateArticle(req.body.articleId, req.body.articleTitle, req.body.articleDescription, req.body.articleBody, req.body.iconCssClass);
	} else {
		req.body.articleId = articlesStore.addArticle(req.body.articleTitle, req.body.articleDescription, req.body.articleBody, req.body.iconCssClass, req.user.userId);
	}

	req.flash.success(`<strong>${req.body.articleTitle}</strong> was saved.`);
	res.redirect(`/article/edit/${req.body.articleId}`);
}

function postArticleDelete(req, res) {

	articlesStore.removeArticle(req.body.articleId);

	req.flash.success(`<strong>${req.body.articleTitle}</strong> was deleted.`);
	res.redirect("/");
}

module.exports.initialize = initialize;