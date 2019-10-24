
var crypto = require("crypto");

var usersRules = {};

usersRules.validatePassword = function(password, passwordHash, passwordHashSalt) {

	var hash = crypto.pbkdf2Sync(password, passwordHashSalt, 10000, 512, "sha512").toString("hex");
	var isValid = (hash === passwordHash);

	return isValid;
};

usersRules.buildPasswordHashes = function(password) {

	var passwordHashes = {};

	passwordHashes.passwordHashSalt = crypto.randomBytes(16).toString("hex");
	passwordHashes.passwordHash = crypto.pbkdf2Sync(password, passwordHashes.passwordHashSalt, 10000, 512, "sha512");
	passwordHashes.passwordHash = passwordHashes.passwordHash.toString("hex");

	return passwordHashes;
};

module.exports = usersRules;