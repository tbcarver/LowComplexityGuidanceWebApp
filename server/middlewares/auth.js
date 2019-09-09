
var coreString = require("../lib/core/extensions/coreString");
var queryStringKeys = require("../keys/queryStringKeys");

var publicRoutesExact = ["/login", "/favicon.ico"];
var publicRoutesStartsWith = ["/assets"];

if (process.env.PUBLIC_ROUTES_EXACT) {
	publicRoutesExact = process.env.PUBLIC_ROUTES_EXACT.split(",");
	publicRoutesExact = publicRoutesExact.map(route => route.trim());
}

if (process.env.PUBLIC_ROUTES_STARTS_WITH) {
	publicRoutesStartsWith = process.env.PUBLIC_ROUTES_STARTS_WITH.split(",");
	publicRoutesStartsWith = publicRoutesStartsWith.map(route => route.trim());
}

function middleware(req, res, next) {

	var isPublicRoute = false;

	if (coreString.compareAny(publicRoutesExact, req.path, true) || coreString.startsWithAny(publicRoutesStartsWith, req.path)) {
		isPublicRoute = true;
	}

	if (isPublicRoute) {
		next();
	} else if (req.isAuthenticated()) {
		next();
	} else {

		var returnUrl = encodeURIComponent(req.url);
		res.redirect(`/login?${queryStringKeys.returnUrl}=${returnUrl}`);
	}
}


module.exports = middleware;