
var sql = require("../lib/coreVendor/betterSqlite/sql");

var usersStore = {};


usersStore.addUser = function(username, firstName, lastName, passwordHash, passwordHashSalt) {

	var id = sql.executeNonQuery(`
		INSERT INTO Users (username, firstName, lastName, passwordHash, passwordHashSalt) 
		VALUES (@username, @firstName, @lastName, @passwordHash, @passwordHashSalt)`,
		{ username, firstName, lastName, passwordHash, passwordHashSalt });

	return id;
}

usersStore.getUsers = function() {

	var users = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users`);

		// TEMP!!
	return users.splice(20);
}

usersStore.findUsers = function(searchTerm) {

	var users = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE userId || ' ' || firstName || ' ' || lastName LIKE @searchTerm `,
		{ searchTerm: `%${searchTerm}%` });

	return users;
}

usersStore.getUser = function(userId) {

	var user = sql.executeRow(`
		SELECT username, firstName, lastName
		FROM Users
		WHERE userId = @userId`,
		{ userId });

	return user;
}

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

	var roleNames = sql.executeQuery(`
		SELECT roleName
		FROM UsersRoles
		INNER JOIN Roles ON UsersRoles.roleId = Roles.roleId		
		WHERE userId = @userId`,
		{ userId });

	roleNames = roleNames.map(element => element.roleName);

	return roleNames;
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