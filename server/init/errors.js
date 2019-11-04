
var errorHandler = require("express-error-handler");

function initialize(app) {

	var handler = errorHandler({
		handlers: {
			"200": function(err, req, res, next) {
				logger.error(getLogData(err, req, 500));
				res.redirect("/error/500");
			},
			"403": function(err, req, res, next) {
				res.redirect("/error/403");
			},
			"404": function(err, req, res, next) {
				logger.info(getLogData(null, req, 404));
				res.redirect("/error/404");
			},
			"500": function(err, req, res, next) {
				logger.error(getLogData(err, req, 500));
				res.redirect("/error/500");
			},
		},
		// Do not shut down the server on non client errors
		shutdown: function() { },
	});

	// 404 needs to be set at the very end of the routes
	app.use(errorHandler.httpError(404));
	app.use(handler);
}

function getLogData(err, req, status) {

	var data = {};

	data.message = status.toString();

	if (err) {

		if (typeof err === "string") {
			data.message = err;
		} else {
			if (err.message) {
				data.message = err.message;
			}

			data.stack = err.stack;
		}
	}

	data.status = status;
	data.url = req.url.toString();

	if (req.user) {
		data.userId = req.user.userId;
		data.username = req.user.username;
	}

	return data;
}

module.exports.initialize = initialize;