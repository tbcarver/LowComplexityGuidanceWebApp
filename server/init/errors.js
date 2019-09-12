
var errorHandler = require('express-error-handler');

function initialize(app) {

	var handler = errorHandler({
		handlers: {
			'403': function(err, req, res, next) {
				res.status(403);
				res.render("errors/403.template.hbs", { title: "403 Not Found" });
			},
			'404': function(err, req, res, next) {
				logger.info(`404`, getLogData(err, req));
				res.status(404);
				res.render("errors/404.template.hbs", { title: "404 Not Found" });
			},
			'500': function(err, req, res, next) {
				logger.error(`500`, getLogData(err, req));
				res.status(500);
				res.render("errors/500.template.hbs", { title: "500 Error" });
			}
		},
		// Do not shut down the server on non client errors
		shutdown : () => {},
	});

	// 404 needs to be set at the very end of the routes
	app.use(errorHandler.httpError(404));
	app.use(handler);
}

function getLogData(err, req) {

	var data = {}

	// TODO: how to get date and error message to the log? default way with winston?
	if (err) {

	}

	if (req.user) {
		data.user = req.user.username;
	}

	if (req.user) {
		data.url = req.url.toString();
	}
	
	return data;
}


module.exports.initialize = initialize;