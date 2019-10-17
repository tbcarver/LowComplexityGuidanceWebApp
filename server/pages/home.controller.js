
var articlesStore = require("../store/articlesStore");

function initialize(app, acl) {
    
    acl.allow("public exact", "/", "*");
    app.get("/", getHome);
    
    acl.allow("public exact", "/articles/:pageNumber?", "*");
    app.get("/articles/:pageNumber?", getHome);
}

function getHome(req, res) {

    var model = { title: "conduit", navbarLinkTitle: "Home" };

    var pageNumber = 1;
    if (req.params.pageNumber) {
        pageNumber = parseInt(req.params.pageNumber);
    }

    model.pagedArticles = articlesStore.getDescendingPagedExtendedArticles(pageNumber, 10);
    model.pagedArticles.pagination.url = "/articles/%s";

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;