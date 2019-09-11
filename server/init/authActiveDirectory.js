

var passport = require("passport");
var ActiveDirectoryStrategy = require("passport-activedirectory");
var auth = require("../middlewares/auth");

function initialize(app, acl) {

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
			userId: profile._json.sAMAccountName,
			username: profile._json.sAMAccountName,
			email: profile._json.userPrincipalName,
			name: profile._json.givenName + " " + profile._json.sn,
			roles: [],
		}

		ad.getGroupMembershipForUser(user.email, function(err, groups) {

			if (err) {
				done(err);
			} else {

				if (groups) {
					user.roles = groups.map(group => group.cn);

					acl.addUserRoles(user.userId, user.roles, function(err) {

						if (err) {
							done(err);
						} else {
							done(null, user);
						}
					});
				} else {
					done(null, user);
				}
			}
		});
	}));

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