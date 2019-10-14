
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


module.exports = usersRolesStore;