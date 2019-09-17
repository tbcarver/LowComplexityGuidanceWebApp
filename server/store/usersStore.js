
var sql = require("../lib/coreVendor/betterSqlite/sql");

var usersStore = {};

usersStore.getUserByUsername = function(username) {

	username = username.toLowerCase();

	var user = sql.executeRow(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE username = @username`,
		{ username });

	return user;
}

usersStore.getRoleNames = function(userId) {

	var result = sql.executeQuery(`
		SELECT roleName
		FROM UsersRoles
		INNER JOIN Roles ON UsersRoles.roleId = Roles.roleId		
		WHERE userId = @userId`,
		{ userId });

	result = result.map(element => element.roleName);

	return result;
}

usersStore.getPasswordHashes = function(username) {

	username = username.toLowerCase();

	var passwordHashes = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		WHERE username = @username`,
		{ username });

	return passwordHashes;
}


module.exports = usersStore;