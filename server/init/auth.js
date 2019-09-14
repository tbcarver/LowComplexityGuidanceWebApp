

var passport = require("passport");
var authStrategy = require("./authSqliteStrategy");
var auth = require("../middlewares/auth");

function initialize(app, acl) {

	passport.use(authStrategy);

	passport.serializeUser(function(user, done) {
		done(null, user);
	});

	passport.deserializeUser(function(user, done) {

		acl.addUserRoles(user.userId, user.roles, function(err) {

			if (err) {
				done(err);
			} else {
				done(null, user);
			}
		});
	});

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(auth);
}


module.exports.initialize = initialize;