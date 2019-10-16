
/** @param { Request } req @param { Response } res */
function middleware(req, res, next) {

	// res.locals are response variables available to the response view template i.e.
	// <h1>{{loggedInUser.fullName}}</h1>

	res.locals.isAuthenticated = req.isAuthenticated();
	res.locals.loggedInUser = {};

	if (req.user) {
		res.locals.loggedInUser.userId = req.user.userId;
		res.locals.loggedInUser.fullName = req.user.fullName;
		res.locals.loggedInUser.roles = req.user.roles;
	}

	next();
}


module.exports = middleware;