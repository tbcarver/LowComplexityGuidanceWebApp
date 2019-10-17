
var LocalStrategy = require("passport-local");
var usersRules = require("../rules/usersRules");
var usersStore = require("../store/usersStore");
var usersRolesStore = require("../store/usersRolesStore");

var sqliteStrategy = new LocalStrategy(
	function(username, password, done) {

		var isValid = false;
		var passwordHashes = usersStore.getPasswordHashesByUsername(username);

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

			var roles = usersRolesStore.getRoleNamesByUserId(user.userId);

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