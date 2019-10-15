
var sql = require("../lib/coreVendor/betterSqlite/sql");

var usersRolesStore = {};

usersRolesStore.getRoleIdsByUserId = function(userId) {

	var roleIds = sql.executeQuery(`
		SELECT roleId
		FROM UsersRoles		
		WHERE userId = @userId`,
		{ userId });

	roleIds = roleIds.map(element => element.roleId);

	return roleIds;
}

usersRolesStore.addUserIdRoleId = function(userId, roleId) {

	var id = sql.executeNonQuery(`
		INSERT INTO UsersRoles (userId, roleId)
		VALUES (@userId, @roleId)`,
		{ userId, roleId });

	return id;
}

usersRolesStore.replaceRoleIdsByUserId = function(roleIds, userId) {

	sql.transaction(function() {

		usersRolesStore.deleteRoleIdsByUserId(userId);

		for (var roleId of roleIds) {
			usersRolesStore.addUserIdRoleId(userId, roleId);
		}
	});
}

usersRolesStore.deleteRoleIdsByUserId = function(userId) {

	sql.executeNonQuery(`
		DELETE FROM UsersRoles		
		WHERE userId = @userId`,
		{ userId });
}


module.exports = usersRolesStore;