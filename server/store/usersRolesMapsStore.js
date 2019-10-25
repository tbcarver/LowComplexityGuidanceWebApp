
var sql = require("../../lib/coreVendor/betterSqlite/sql");

var usersRolesMapsStore = {};

usersRolesMapsStore.getRoleIds = function(userId) {

	var results = sql.executeQuery(`
		SELECT roleId
		FROM UsersRolesMaps		
		WHERE userId = @userId`,
	{ userId });

	results = results.map(element => element.roleId);

	return results;
};

usersRolesMapsStore.getRoleNames = function(userId) {

	var results = sql.executeQuery(`
		SELECT roleName
		FROM UsersRolesMaps
			INNER JOIN Roles ON UsersRolesMaps.roleId = Roles.roleId
		WHERE userId = @userId`,
	{ userId });

	results = results.map(element => element.roleName);

	return results;
};

usersRolesMapsStore.addUserIdRoleId = function(userId, roleId) {

	var id = sql.executeNonQuery(`
		INSERT INTO UsersRolesMaps (userId, roleId)
		VALUES (@userId, @roleId)`,
	{ userId, roleId });

	return id;
};

usersRolesMapsStore.replaceRoleIdsByUserId = function(roleIds, userId) {

	sql.transaction(function() {

		usersRolesMapsStore.removeRoleIdsByUserId(userId);

		for (var roleId of roleIds) {
			usersRolesMapsStore.addUserIdRoleId(userId, roleId);
		}
	});
};

usersRolesMapsStore.removeRoleIdsByUserId = function(userId) {

	sql.executeNonQuery(`
		DELETE FROM UsersRolesMaps		
		WHERE userId = @userId`,
	{ userId });
};

module.exports = usersRolesMapsStore;