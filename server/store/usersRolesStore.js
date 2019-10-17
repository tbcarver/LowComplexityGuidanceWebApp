
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

usersRolesStore.getRoleNamesByUserId = function(userId) {

	var roleNames = sql.executeQuery(`
		SELECT roleName
		FROM UsersRoles
			INNER JOIN Roles ON UsersRoles.roleId = Roles.roleId
		WHERE userId = @userId`,
		{ userId });

		roleNames = roleNames.map(element => element.roleName);

	return roleNames;
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

		usersRolesStore.removeRoleIdsByUserId(userId);

		for (var roleId of roleIds) {
			usersRolesStore.addUserIdRoleId(userId, roleId);
		}
	});
}

usersRolesStore.removeRoleIdsByUserId = function(userId) {

	sql.executeNonQuery(`
		DELETE FROM UsersRoles		
		WHERE userId = @userId`,
		{ userId });
}


module.exports = usersRolesStore;