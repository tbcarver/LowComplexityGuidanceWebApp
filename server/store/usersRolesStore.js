
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

usersRolesStore.deleteRoleIdsByUserId = function(userId) {

	sql.executeNonQuery(`
		DELETE
		FROM UsersRoles		
		WHERE userId = @userId`,
		{ userId });
}


module.exports = usersRolesStore;