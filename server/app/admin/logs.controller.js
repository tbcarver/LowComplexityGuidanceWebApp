
var logsStore = require("../../store/logsStore");

function initialize(app, acl) {

    // acl noop
    app.get("/logs/:pageNumber?", getLogs);
    app.get("/log/:logId", getLog);
}

/** @param { Request } req @param { Response } res */
function getLogs(req, res) {

    var model = new AppModel(req, "Logs");
    model.layout = "oneColumn.layout.hbs";

    var pageNumber = 1;
    if (req.params.pageNumber) {
        pageNumber = parseInt(req.params.pageNumber);
    }

    model.pagedLogs = logsStore.getPagedLogs(pageNumber, 5);
    model.pagedLogs.pagination.url = "/logs/%d";

    res.render("admin/logsMaster.template.hbs", model);
};

/** @param { Request } req @param { Response } res */
function getLog(req, res) {

    var model = new AppModel(req, "Logs");
    model.layout = "oneColumn.layout.hbs";

    var log = logsStore.getLog(req.params.logId);
    model = Object.assign(model, log);

    res.render("admin/logsDetails.template.hbs", model);
};


module.exports.initialize = initialize;