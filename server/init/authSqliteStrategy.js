
var LocalStrategy = require("passport-local");
var usersRules = require("../rules/usersRules");
var usersStore = require("../store/usersStore");
var usersRolesMapsStore = require("../store/usersRolesMapsStore");

var sqliteStrategy = new LocalStrategy(
	function(username, password, done) {

		var isValid = false;
		var passwordHashes = usersStore.getPasswordHashes(null, username);

		if (passwordHashes) {
			isValid = usersRules.validatePassword(password, passwordHashes.passwordHash,
				passwordHashes.passwordHashSalt);
		}

		if (isValid) {

			var user = usersStore.getUser(null, username);
			var userProfile = {
				userId: user.userId,
				username: user.username,
				fullName: user.firstName + " " + user.lastName,
				roles: [],
			}

			var roles = usersRolesMapsStore.getRoleNames(user.userId);

			if (roles) {
				userProfile.roles = roles;
			}

			done(null, userProfile);

		} else {

			var info = "password";

			if (!passwordHashes) {
				info = "username";
			}

			done(null, null, info);
		}
	}
);

sqliteStrategy.name = "Sqlite";

module.exports = sqliteStrategy;