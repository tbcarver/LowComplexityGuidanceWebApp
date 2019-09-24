
var articlesStore = require("../store/articlesStore");

function initialize(app, acl) {
    
    acl.allow("public exact", "/:pageNumber?", "*");
    app.get("/:pageNumber?", getHome);
}

/** @param { Request } req @param { Response } res */
function getHome(req, res) {

    var model = new AppModel(req, "conduit", "Home");

    var pageNumber = 1;
    if (req.params.pageNumber) {
        pageNumber = parseInt(req.params.pageNumber);
    }

    model.pagedArticles = articlesStore.getDescendingPagedRelationalArticles(pageNumber, 10);
    model.pagedArticles.pagination.url = "/%d";

    res.render("home.template.hbs", model);
};


module.exports.initialize = initialize;