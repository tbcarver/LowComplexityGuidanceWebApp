
var cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
var expressFlashNotification = require("express-flash-notification");
var FlashWrapper = require("../lib/coreVendor/expressFlashNotification/flashWrapper");

function initialize(app) {

	// NOTE: Only auth information is planned for storage in the session.
	//  If more session storage is needed, move away from full session in the cookie using cookie-session
	//  and go to express-session with storage like sql.
	app.use(cookieSession({
		keys: [process.env.SESSION_SECRET],
		maxAge: 24 * 60 * 60 * 1000, // 24 hours
	}));

	app.use(function(req, res, next) {

		// Update a value in the cookie so that the set-cookie will be sent.
		// Only changes every minute so that it"s not sent with every request.
		req.session.nowInMinutes = Math.floor(Date.now() / 60 * 1000);
		next();
	});

	app.use(bodyParser.json({ limit: "1mb" }));
	app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));

	var beforeSingleRenderCount = 0;

	app.use(expressFlashNotification(app, {
		beforeSingleRender: function(item, callback) {
			item.layout = false;
			item.count = beforeSingleRenderCount;

			beforeSingleRenderCount++;
			callback(null, item);
		},
		utilityName: "expressFlashNotification",
		viewName: "flash.template.hbs",
	}));

	app.use(function(req, res, next) {
		beforeSingleRenderCount = 0;
		req.flash = new FlashWrapper(req.expressFlashNotification);
		next();
	});
}

module.exports.initialize = initialize;