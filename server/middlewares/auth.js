
var coreString = require("../lib/core/extensions/coreString");
var queryStringKeys = require("../keys/queryStringKeys");

/** @param { Request } req @param { Response } res */
function middleware(req, res, next) {

	var resource;

	// Use the route pattern as the resource to check
	for (var layer of req.app._router.stack) {
		if (layer.route && layer.match(req.path)) {
			resource = layer.route.path;
		}
	}

	if (resource) {
		authorizePublic(req, res, next, resource, function() {
			if (req.isAuthenticated()) {

				req.acl.isAllowed(req.user.userId, resource, req.method, function(err, allowed) {

					if (err) {
						throw err;
					}

					if (allowed) {
						next();
					} else {
						next(new ServerError("Unauthorized", 403));
					}
				});
			} else {

				var returnUrl = encodeURIComponent(req.url);
				res.redirect(`/login?${queryStringKeys.returnUrl}=${returnUrl}`);
			}
		});
	} else {

		authorizePublic(req, res, next, req.path, function() {
			next(new ServerError("Unknown route", 404));
		});
	}
}

function authorizePublic(req, res, next, path, callback) {

	req.acl.whatResources("public exact", function(err, resources) {

		if (err) {
			throw err;
		}

		var publicRoutesExact = Object.keys(resources);

		if (coreString.compareAny(publicRoutesExact, path, true)) {
			next();
		} else {

			req.acl.whatResources("public starts with", function(err, resources) {

				if (err) {
					throw err;
				}

				var publicRoutesStartsWith = Object.keys(resources);

				if (coreString.startsWithAny(publicRoutesStartsWith, path, true)) {
					next();
				} else {
					callback();
				}
			});
		}
	});
}


module.exports = middleware;