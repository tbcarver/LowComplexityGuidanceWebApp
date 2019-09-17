
var errorHandler = require('express-error-handler');

function initialize(app) {

	var handler = errorHandler({
		handlers: {
			'200': function(err, req, res, next) {
				logger.error(`500`, getLogData(err, req));
				res.status(500);

				var model = new AppModel(req, "500 Error");
				res.render("errors/500.template.hbs", model);
			},
			'403': function(err, req, res, next) {
				res.status(403);

				var model = new AppModel(req, "403 Not Found");
				res.render("errors/403.template.hbs", model);
			},
			'404': function(err, req, res, next) {
				logger.info(`404`, getLogData(null, req));
				res.status(404);

				var model = new AppModel(req, "404 Not Found");
				res.render("errors/404.template.hbs", model);
			},
			'500': function(err, req, res, next) {
				logger.error(`500`, getLogData(err, req));
				res.status(500);

				var model = new AppModel(req, "500 Error");
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

function getLogData(err, req) {

	var data = {};

	if (err) {
		data.stack = err.stack;
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