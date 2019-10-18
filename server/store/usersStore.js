
var sql = require("../lib/coreVendor/betterSqlite/sql");
var usersRolesStore = require("./usersRolesStore");

var usersStore = {};

usersStore.getUsers = function() {

	var users = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users`);

	return users;
}

usersStore.getPagedUsers = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE userId NOT IN (SELECT userId FROM Users
							 ORDER BY userId
							 LIMIT @offset)
		ORDER BY userId
		LIMIT @limit`,
		limitOffset);

	var total = 0;
	if (result.length > 0) {
		total = this.getCount();
	}

	result = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: result.length,
			total,
		},
		users: result,
	};

	return result;
}

usersStore.findUsers = function(searchTerm) {

	var users = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE (userId LIKE @searchTerm) OR (firstName LIKE @searchTerm) OR (lastName LIKE @searchTerm)`,
		{ searchTerm: `%${searchTerm}%` });

	return users;
}

usersStore.getUser = function(userId) {

	var user = sql.executeRow(`
		SELECT userId, username, firstName, lastName
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

usersStore.getCount = function() {

	return sql.executeScalar(`
	SELECT COUNT(*)
	FROM Users`);
}

usersStore.getPasswordHashes = function(userId) {

	var passwordHashes = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		WHERE userId = @userId`,
		{ userId });

	return passwordHashes;
}

usersStore.getPasswordHashesByUsername = function(username) {

	username = username.toLowerCase();

	var passwordHashes = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		WHERE username = @username`,
		{ username });

	return passwordHashes;
}

usersStore.addUser = function(username, firstName, lastName, passwordHash, passwordHashSalt, roleIds) {

	var id;

	sql.transaction(function() {

		id = sql.executeNonQuery(`
			INSERT INTO Users (username, firstName, lastName, passwordHash, passwordHashSalt) 
			VALUES (@username, @firstName, @lastName, @passwordHash, @passwordHashSalt)`,
			{ username, firstName, lastName, passwordHash, passwordHashSalt });

		if (roleIds) {
			usersRolesStore.replaceRoleIdsByUserId(roleIds, id);
		}
	});

	return id;
}

usersStore.updateUser = function(userId, username, firstName, lastName, passwordHash, passwordHashSalt, roleIds) {

	if (!passwordHash) {
		var user = this.getPasswordHashes(userId);

		passwordHash = user.passwordHash;
		passwordHashSalt = user.passwordHashSalt;
	}

	sql.transaction(function() {

		sql.executeNonQuery(`
			UPDATE Users
			SET username = @username, firstName = @firstName, lastName = @lastName, passwordHash = @passwordHash, passwordHashSalt = @passwordHashSalt
			WHERE userId = @userId`,
			{ userId, username, firstName, lastName, passwordHash, passwordHashSalt });

		if (roleIds) {
			usersRolesStore.replaceRoleIdsByUserId(roleIds, userId);
		}
	});
}

usersStore.removeUser = function(userId) {

	sql.transaction(function() {

		usersRolesStore.removeRoleIdsByUserId(userId);

		sql.executeNonQuery(`
			DELETE FROM Users
			WHERE userId = @userId`,
			{ userId });
	});
}


module.exports = usersStore;