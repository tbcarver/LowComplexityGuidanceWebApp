
var logsStore = require("../../store/logsStore");
var _ = require("lodash");
var logLevels = require("triple-beam").configs.npm.levels;

function initialize(app, acl) {

	// Acl noop
	app.get("/logs/:pageNumber?", getLogs);
	app.post("/logs", postLog);
	app.get("/log/:logId", getLog);
}

function getLogs(req, res) {

	var model = { title: "Logs" };

	var pageNumber = 1;
	if (req.params.pageNumber) {
		pageNumber = parseInt(req.params.pageNumber);
	}

	model.pagedLogs = logsStore.getDescendingPagedLogs(pageNumber, 20);
	model.pagedLogs.pagination.url = "/logs/%s";

	model.levels = Object.keys(logLevels);
	model.status = [403, 404, 500];

	res.render("admin/logsMaster.template.hbs", model);
}

function postLog(req, res) {

	var model = { title: "Logs" };
	model.search = _.clone(req.body);

	var pageNumber = 1;
	if (req.params.pageNumber) {
		pageNumber = parseInt(req.params.pageNumber);
	}

	model.pagedLogs = logsStore.getDescendingPagedLogs(pageNumber, 20, req.body.level, req.body.status, req.body.userId,
		req.body.message);
	model.pagedLogs.pagination.url = "/logs/%s";

	model.levels = Object.keys(logLevels);
	model.status = [403, 404, 500];

	res.render("admin/logsMaster.template.hbs", model);
}

function getLog(req, res) {

	var model = { title: "Logs" };
	model.layout = "oneColumn.layout.hbs";

	var log = logsStore.getLog(req.params.logId);
	model = Object.assign(model, log);

	res.render("admin/logsDetails.template.hbs", model);
}

module.exports.initialize = initialize;