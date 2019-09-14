

var ActiveDirectoryStrategy = require("passport-activedirectory");

var activeDirectoryStrategy = new ActiveDirectoryStrategy({
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
		fullName: profile._json.givenName + " " + profile._json.sn,
		roles: [],
	}

	ad.getGroupMembershipForUser(user.email, function(err, groups) {

		if (err) {
			done(err);
		} else {

			if (groups) {
				user.roles = groups.map(group => group.cn);
			}

			done(null, user);
		}
	});
});

activeDirectoryStrategy.name = "ActiveDirectory";


module.exports = activeDirectoryStrategy;