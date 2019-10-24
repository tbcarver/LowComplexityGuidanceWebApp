
var articlesStore = require("../store/articlesStore");
var queryStringKeys = require("../keys/queryStringKeys");

function initialize(app, acl) {

	acl.allow("public exact", "/", "*");
	app.get("/", getHome);

	acl.allow("public exact", "/articles/:pageNumber?", "*");
	app.get("/articles/:pageNumber?", getHome);
}

function getHome(req, res) {

	var model = {
		title: "conduit",
		navbarLinkTitle: "Home",
		navTabTitle: "Articles",
	};

	var paginationUrl = "/articles/%s";
	var searchTerm = req.query[queryStringKeys.searchTerm];
	var authorIdFilter;

	if (searchTerm === "myArticles" && req.user) {        
		model.navTabTitle = "My articles";
		authorIdFilter = req.user.userId;
		paginationUrl += `?${queryStringKeys.searchTerm}=myArticles`;
	}

	var pageNumber = 1;
	if (req.params.pageNumber) {
		pageNumber = parseInt(req.params.pageNumber);
	}

	var userId = req.user ? req.user.userId : null;

	model.pagedArticles = articlesStore.getDescendingPagedExtendedArticles(pageNumber, 10, userId, authorIdFilter);
	model.pagedArticles.pagination.url = paginationUrl;

	res.render("home.template.hbs", model);
}

module.exports.initialize = initialize;