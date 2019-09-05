
var cookieSession = require("cookie-session");
var bodyParser = require('body-parser');

function initialize(app) {

	app.use(cookieSession({
		keys: [process.env.SESSION_SECRET],
		maxAge: 24 * 60 * 60 * 1000 // 24 hours
	}));
	
	app.use(function(req, res, next) {
	
		// Update a value in the cookie so that the set-cookie will be sent.
		// Only changes every minute so that it's not sent with every request.
		req.session.nowInMinutes = Math.floor(Date.now() / 60 * 1000);
		next();
	});
	
	app.use(bodyParser.json({ limit: '1mb' }));
	app.use(bodyParser.urlencoded({ extended: false, limit: '1mb' }));
}


module.exports.initialize = initialize;