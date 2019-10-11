
/** @param { Request } req @param { Response } res */
function middleware(req, res, next) {

	// res.locals are response variables available to the response view template i.e.
	// <h1>{{userFullName}}</h1>

	res.locals.isAuthenticated = req.isAuthenticated();

	if (req.user) {
		res.locals.userId = req.user.userId;
		res.locals.userFullName = req.user.fullName;
		res.locals.userRoles = req.user.roles;
	}

	next();
}


module.exports = middleware;