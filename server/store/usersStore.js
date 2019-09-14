
var crypto = require("crypto");
var sql = require("../lib/coreVendor/betterSqlite/sql");

var usersStore = {};

usersStore.getUserByUsername = function(username) {

	username = username.toLowerCase();

	var user = sql.executeRow(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE username = @username`, { username: username });

	return user;
}

usersStore.getRoleNames = function(userId) {

	var result = sql.executeQuery(`
		SELECT roleName
		FROM UsersRoles
		INNER JOIN Roles ON UsersRoles.roleId = Roles.roleId		
		WHERE userId = @userId`, { userId: userId });

	result = result.map(element => element.roleName);

	return result;
}

usersStore.validatePassword = function(username, password) {

	var isValid = false;
	username = username.toLowerCase();

	var row = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		WHERE username = @username`, { username: username });

	if (row) {
		var hash = crypto.pbkdf2Sync(password, row.passwordHashSalt, 10000, 512, "sha512").toString("hex");
		isValid = (hash === row.passwordHash);
	}

	return isValid;
}

usersStore.createUser = function(username, firstName, lastName, password) {

	username = username.toLowerCase();

	var salt = crypto.randomBytes(16).toString("hex");
	var hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");
}


module.exports = usersStore;