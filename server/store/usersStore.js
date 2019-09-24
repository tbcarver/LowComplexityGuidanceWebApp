
var sql = require("../lib/coreVendor/betterSqlite/sql");
var usersRules = require("../rules/usersRules");

var usersStore = {};

usersStore.getUser = function (userId) {	

	var user = sql.executeRow(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE userId = @userId`,
		{ userId });

	return user;
}

usersStore.getUserByUsername = function (username) {

	username = username.toLowerCase();

	var user = sql.executeRow(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE username = @username`,
		{ username });

	return user;
}

usersStore.getRoleNames = function (userId) {

	var roleNames = sql.executeQuery(`
		SELECT roleName
		FROM UsersRoles
		INNER JOIN Roles ON UsersRoles.roleId = Roles.roleId		
		WHERE userId = @userId`,
		{ userId });

	roleNames = roleNames.map(element => element.roleName);

	return roleNames;
}

usersStore.getPasswordHashes = function (username) {

	username = username.toLowerCase();

	var passwordHashes = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		WHERE username = @username`,
		{ username });

	return passwordHashes;
}


usersStore.addUser = function (user) {
	var passwordHashes = usersRules.buildPasswordHashes(user.password)

	var userId = sql.executeNonQuery(`
		INSERT INTO Users (username, firstName, lastName, passwordHash, passwordHashSalt) 
		VALUES (@username, @firstName, @lastName, @passwordHash, @passwordHashSalt)`,
			{ username: user.userName, firstName: user.firstName, lastName: user.lastName, passwordHash: passwordHashes.passwordHash, passwordHashSalt: passwordHashes.passwordHashSalt });

	for (var roleId of user.roles) {

		sql.executeNonQuery(`
		INSERT INTO UsersRoles (userId, roleId) 
		VALUES (@userId, @roleId) `,
			{ userId, roleId });
	}
}

usersStore.getUsers = function () {

	var users = sql.executeQuery(`
		SELECT Users.userId, username, firstName, lastName
		FROM Users`);

	return users;
}

module.exports = usersStore;