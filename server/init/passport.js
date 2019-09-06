

var passport = require("passport");
var ActiveDirectoryStrategy = require("passport-activedirectory");
var auth = require("../middlewares/auth");

function initialize(app) {

	passport.use(new ActiveDirectoryStrategy({
		integrated: false,
		ldap: {
			url: process.env.AD_URL,
			baseDN: process.env.AD_BASE_DN,
			username: process.env.AD_USERNAME,
			password: process.env.AD_PASSWORD
		},
	}, function(profile, ad, done) {

		var user = {
			username: profile._json.sAMAccountName,
			email: profile._json.userPrincipalName,
			name: profile._json.givenName + " " + profile._json.sn,
			roles: [],
		}

		ad.getGroupMembershipForUser(user.email, function(err, groups) {

			var result;

			if (err) {
				result = done(err);
			} else {

				if (groups) {
					user.roles = groups.map(group => group.cn);
				}

				result = done(null, user);
			}

			return result;
		});
	}));

	passport.serializeUser(function(user, done) {

		done(null, user);
	});

	passport.deserializeUser(function(user, done) {

		done(null, user);
	});

	app.use(passport.initialize());
	app.use(passport.session());

	app.use(auth);
}


module.exports.initialize = initialize;