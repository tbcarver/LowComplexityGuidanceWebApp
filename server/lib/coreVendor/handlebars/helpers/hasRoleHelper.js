
// block helper

var coreArray = require("../../../core/extensions/coreArray");

var hasRoleHelper = {
	name: "hasRole"
};

// NOTE: This helper is not using acl because it is asynchronous.
//  If there was a synchronous acl then this should use that.
//  Given that this is two arrays of roles, there is not some other auth helper for the hasRole check.

/** @param {String} roles This can be a comma delimited string of roles. */
hasRoleHelper.helper = function(roles, options) {

	roles = roles.split(",");
	coreArray.trim(roles);

	return coreArray.includesAny(roles, this.userRoles);
}


module.exports = hasRoleHelper;