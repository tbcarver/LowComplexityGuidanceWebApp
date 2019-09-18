
var logsStore = require("../../store/logsStore");

function initialize(app, acl) {
    
    app.get("/logs", getLogs);
}

/** @param { Request } req @param { Response } res */
function getLogs(req, res) {
    
    var model = new AppModel(req, "Logs");

	model.logs = logsStore.getLogs();
    
    res.render("admin/logs.template.hbs", model);
};


module.exports.initialize = initialize;