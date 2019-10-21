
var sql = require("../lib/coreVendor/betterSqlite/sql");

var rolesStore = {};

rolesStore.getRoles = function() {

	var results = sql.executeQuery(`
		SELECT roleId, roleName
		FROM Roles`);

	return results;
}

module.exports = rolesStore;