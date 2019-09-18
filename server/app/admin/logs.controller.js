
var logsStore = require("../../store/logsStore");

function initialize(app, acl) {

    app.get("/logs", getLogs);
    app.get("/log/:logId", getLog);
}

/** @param { Request } req @param { Response } res */
function getLogs(req, res) {

    var model = new AppModel(req, "Logs");
    model.layout = "oneColumn.layout.hbs";

    model.logs = logsStore.getLogs();

    res.render("admin/logs.template.hbs", model);
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