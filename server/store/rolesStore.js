
var sql = require("../lib/coreVendor/betterSqlite/sql");

var rolesStore = {};

rolesStore.getRoles = function() {

	var roles = sql.executeQuery(`
		SELECT roleId, roleName
		FROM Roles`);

	return roles;
}

module.exports = rolesStore;