
var coreString = require("../lib/core/extensions/coreString");
var coreArray = require("../lib/core/extensions/coreArray");
var queryStringKeys = require("../keys/queryStringKeys");

var rolesAllAllowed = ["administrator"];

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
		nonAclAuthorize(req, res, next, "public", resource, function() {
			if (req.isAuthenticated()) {
				nonAclAuthorize(req, res, next, "authenticated", resource, function() {

					if (coreArray.includesAny(rolesAllAllowed, req.user.roles)) {
						next();
					} else {
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
					}
				});
			} else {
				var returnUrl = encodeURIComponent(req.url);
				res.redirect(`/login?${queryStringKeys.returnUrl}=${returnUrl}`);
			}
		});
	} else {

		nonAclAuthorize(req, res, next, "public", req.path, function() {
			next(new ServerError("Unknown route", 404));
		});
	}
}

function nonAclAuthorize(req, res, next, type, path, callback) {

	req.acl.whatResources(type + " exact", function(err, resources) {

		if (err) {
			throw err;
		}

		var routesExact = Object.keys(resources);

		if (coreString.compareAny(routesExact, path, true)) {
			next();
		} else {

			req.acl.whatResources(type + " starts with", function(err, resources) {

				if (err) {
					throw err;
				}

				var routesStartsWith = Object.keys(resources);

				if (coreString.startsWithAny(routesStartsWith, path, true)) {
					next();
				} else {
					callback();
				}
			});
		}
	});
}


module.exports = middleware;