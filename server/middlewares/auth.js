
var coreString = require("../lib/core/extensions/coreString");
var queryStringKeys = require("../keys/queryStringKeys");

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

						var segments = req.path.split("/");
						var currentSegmentIndex = 1; // off by one because of joining index 0 to including index 1

						function isAllowed() {

							var path = segments.slice(0, currentSegmentIndex).join("/");
							if (!path) {
								path = "/";
							}

							req.acl.isAllowed(req.user.userId, path, req.method, function(err, allowed) {

								if (err) {
									throw err;
								}

								if (allowed) {
									next();
								} else if (currentSegmentIndex < segments.length) {
									currentSegmentIndex++;
									isAllowed();
								} else {
									// TODO: return the not auth status code 403
									next(new Error("NO"));
								}
							});
						}

						isAllowed();

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