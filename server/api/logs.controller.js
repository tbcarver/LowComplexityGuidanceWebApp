
var _ = require("lodash");

function initialize(app, acl) {

	acl.allow("public exact", "/api/logs/add", "*");
	app.post("/api/logs/add", addLog);
}

/**
 * @param {string} req.body.level
 * @param {string} req.body.message
 * @param {string} req.body.stack
 * @param {string} req.body.url
 */
function addLog(req, res) {

	var data = _.clone(req.body);

	if (req.user) {
		data.userId = req.user.userId;
		data.username = req.user.username;
	}

	logger.log(data.level, data);
	res.send("Log added.");
}

module.exports.initialize = initialize;
