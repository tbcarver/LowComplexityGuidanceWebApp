
var logsStore = require("../../store/logsStore");

function initialize(app, acl) {

    // acl noop
    app.get("/logs/:pageNumber?", getLogs);
    app.get("/log/:logId", getLog);
}

function getLogs(req, res) {

    var model = new AppModel(req, "Logs");
    model.layout = "oneColumn.layout.hbs";

    var pageNumber = 1;
    if (req.params.pageNumber) {
        pageNumber = parseInt(req.params.pageNumber);
    }

    model.pagedLogs = logsStore.getDescendingPagedLogs(pageNumber, 20);
    model.pagedLogs.pagination.url = "/logs/%s";

    res.render("admin/logsMaster.template.hbs", model);
};

function getLog(req, res) {

    var model = new AppModel(req, "Logs");
    model.layout = "oneColumn.layout.hbs";

    var log = logsStore.getLog(req.params.logId);
    model = Object.assign(model, log);

    res.render("admin/logsDetails.template.hbs", model);
};


module.exports.initialize = initialize;