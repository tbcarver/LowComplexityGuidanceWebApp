
var LocalStrategy = require("passport-local");
var usersRules = require("../rules/usersRules");
var usersStore = require("../store/usersStore");

var sqliteStrategy = new LocalStrategy(
	function(username, password, done) {

		var isValid = false;
		var passwordHashes = usersStore.getPasswordHashes(username);

		if (passwordHashes) {
			isValid = usersRules.validatePassword(password, passwordHashes.passwordHash, passwordHashes.passwordHashSalt);
		}

		if (isValid) {

			var user = usersStore.getUserByUsername(username);
			var userProfile = {
				userId: user.userId,
				username: user.username,
				fullName: user.firstName + " " + user.lastName,
				roles: [],
			}

			var roles = usersStore.getRoleNames(user.userId);

			if (roles) {
				userProfile.roles = roles;
			}

			done(null, userProfile);

		} else {
			done(null, null);
		}
	}
);

sqliteStrategy.name = "Sqlite";


module.exports = sqliteStrategy;