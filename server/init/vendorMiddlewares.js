
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
const flash = require('express-flash-notification');

function initialize(app) {

	// NOTE: Only auth information is planned for storage in the session.
	//  If more session storage is needed, move away from full session in the cookie using cookie-session
	//  and go to express-session with storage like sql.
	app.use(cookieSession({
		keys: [process.env.SESSION_SECRET],
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	}));

	app.use(function(req, res, next) {

		// Update a value in the cookie so that the set-cookie will be sent.
		// Only changes every minute so that it"s not sent with every request.
		req.session.nowInMinutes = Math.floor(Date.now() / 60 * 1000);
		next();
	});

	app.use(bodyParser.json({ limit: "1mb" }));
	app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

	app.use(flash(app, {
		beforeSingleRender: function(item, callback) {
			item.layout = false;
			callback(null, item);
		},
		afterAllRender: function(resultHTML, callback) {

			var data = { body: resultHTML, layout: false };

			app.render("flashLayout.template.hbs", data, function(error, html) {
				callback(error, html);
			})
		},
		viewName: "flash.template.hbs"
	}));
}


module.exports.initialize = initialize;