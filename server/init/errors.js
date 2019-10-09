
var errorHandler = require("express-error-handler");

function initialize(app) {

	var handler = errorHandler({
		handlers: {
			"200": function(err, req, res, next) {
				logger.error(getLogData(err, req, 500));
				res.status(500);

				var model = { title: "500 Error" };
				res.render("errors/500.template.hbs", model);
			},
			"403": function(err, req, res, next) {
				res.status(403);

				var model = { title: "403 Not Found" };
				res.render("errors/403.template.hbs", model);
			},
			"404": function(err, req, res, next) {
				logger.info(getLogData(null, req, 404));
				res.status(404);

				var model = { title: "404 Not Found" };
				res.render("errors/404.template.hbs", model);
			},
			"500": function(err, req, res, next) {
				logger.error(getLogData(err, req, 500));
				res.status(500);

				var model = { title: "500 Error" };
				res.render("errors/500.template.hbs", model);
			}
		},
		// Do not shut down the server on non client errors
		shutdown: () => { },
	});

	// 404 needs to be set at the very end of the routes
	app.use(errorHandler.httpError(404));
	app.use(handler);
}

function getLogData(err, req, status) {

	var data = {};

	data.message = status.toString();

	if (err) {
		data.stack = err.stack;
		data.message = err.message;
	}

	data.status = status;
	data.url = req.url.toString();

	if (req.user) {
		data.username = req.user.username;
	}

	return data;
}


module.exports.initialize = initialize;