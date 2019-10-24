
var sql = require("../lib/coreVendor/betterSqlite/sql");
var WhereClause = require("../lib/core/sql/whereClause");
var _ = require("lodash");
var usersRolesMapsStore = require("./usersRolesMapsStore");

var usersStore = {};

usersStore.getUsers = function(userId, username) {

	var whereClause = new WhereClause();
	whereClause.addAndClause("userId = @userId", "userId", userId);
	whereClause.addAndClause("username = @username", "username", username);

	var results = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		${whereClause.buildWhere()}`,
	whereClause.parameters);

	return results;
};

usersStore.getUser = function(userId, username) {

	var results = this.getUsers(userId, username);
	results = _.first(results);

	return results;
};

usersStore.getPagedUsers = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var results = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE userId NOT IN (SELECT userId FROM Users
							 ORDER BY userId
							 LIMIT @offset)
		ORDER BY userId
		LIMIT @limit`,
	limitOffset);

	var total = 0;
	if (results.length > 0) {
		total = this.getCount();
	}

	results = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: results.length,
			total,
		},
		users: results,
	};

	return results;
};

usersStore.searchUsers = function(searchTerm) {

	var results = sql.executeQuery(`
		SELECT userId, username, firstName, lastName
		FROM Users
		WHERE (userId LIKE @searchTerm) OR (firstName LIKE @searchTerm) OR (lastName LIKE @searchTerm)`,
	{ searchTerm: `%${searchTerm}%` });

	return results;
};

usersStore.getPasswordHashes = function(userId, username) {

	if (username) {
		username = username.toLowerCase();
	}

	var whereClause = new WhereClause();
	whereClause.addAndClause("userId = @userId", "userId", userId);
	whereClause.addAndClause("username = @username", "username", username);

	var results = sql.executeRow(`
		SELECT passwordHash, passwordHashSalt
		FROM Users
		${whereClause.buildWhere()}`,
	whereClause.parameters);

	return results;
};

usersStore.getCount = function() {

	return sql.executeScalar(`
	SELECT COUNT(*)
	FROM Users`);
};

usersStore.addUser = function(username, firstName, lastName, passwordHash, passwordHashSalt, roleIds) {

	var id;

	sql.transaction(function() {

		id = sql.executeNonQuery(`
			INSERT INTO Users (username, firstName, lastName, passwordHash, passwordHashSalt) 
			VALUES (@username, @firstName, @lastName, @passwordHash, @passwordHashSalt)`,
		{ username, firstName, lastName, passwordHash, passwordHashSalt });

		if (roleIds) {
			usersRolesMapsStore.replaceRoleIdsByUserId(roleIds, id);
		}
	});

	return id;
};

usersStore.updateUser = function(userId, username, firstName, lastName, passwordHash, passwordHashSalt, roleIds) {

	if (!passwordHash) {
		var user = this.getPasswordHashes(userId);

		passwordHash = user.passwordHash;
		passwordHashSalt = user.passwordHashSalt;
	}

	sql.transaction(function() {

		sql.executeNonQuery(`
			UPDATE Users
			SET username = @username, firstName = @firstName, lastName = @lastName, passwordHash = @passwordHash,
				passwordHashSalt = @passwordHashSalt
			WHERE userId = @userId`,
		{ userId, username, firstName, lastName, passwordHash, passwordHashSalt });

		if (roleIds) {
			usersRolesMapsStore.replaceRoleIdsByUserId(roleIds, userId);
		}
	});
};

usersStore.removeUser = function(userId) {

	sql.transaction(function() {

		usersRolesMapsStore.removeRoleIdsByUserId(userId);

		sql.executeNonQuery(`
			DELETE FROM Users
			WHERE userId = @userId`,
		{ userId });
	});
};

module.exports = usersStore;