
var coreString = require("../lib/core/extensions/coreString");
var queryStringKeys = require("../keys/queryStringKeys");

/** @param { Request } req @param { Response } res */
function middleware(req, res, next) {

	req.acl.whatResources("public exact", function(err, resources) {

		if (err) {
			throw err;
		}

		var publicRoutesExact = Object.keys(resources);

		if (coreString.compareAny(publicRoutesExact, req.path, true)) {
			next();
		} else {

			req.acl.whatResources("public starts with", function(err, resources) {

				if (err) {
					throw err;
				}

				var publicRoutesStartsWith = Object.keys(resources);

				if (coreString.startsWithAny(publicRoutesStartsWith, req.path, true)) {
					next();
				} else {

					if (req.isAuthenticated()) {

						var resource = req.path;

						// Use the route pattern as the resource to check
						for (var layer of req.app._router.stack) {
							if (layer.route && layer.match(req.path)) {
								resource = layer.route.path;
							}
						}

						req.acl.isAllowed(req.user.userId, resource, req.method, function(err, allowed) {

							if (err) {
								throw err;
							}

							if (allowed) {
								next();
							} else {
								// TODO: return the not auth status code 403
								next(new Error("NO"));
							}
						});

					} else {

						var returnUrl = encodeURIComponent(req.url);
						res.redirect(`/login?${queryStringKeys.returnUrl}=${returnUrl}`);
					}
				}
			});
		}
	});
}


module.exports = middleware;