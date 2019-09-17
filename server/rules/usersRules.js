
var usersStore = require("../store/usersStore");
var crypto = require("crypto");

var usersRules = {};

usersRules.validatePassword = function(username, password) {

	var isValid = false;

	var passwordHashes = usersStore.getPasswordHashes(username);

	if (passwordHashes) {
		var hash = crypto.pbkdf2Sync(password, passwordHashes.passwordHashSalt, 10000, 512, "sha512").toString("hex");
		isValid = (hash === passwordHashes.passwordHash);
	}

	return isValid;
}

usersRules.buildPasswordHashes = function(username) {

	var passwordHashes = {};

	username = username.toLowerCase();

	passwordHashes.salt = crypto.randomBytes(16).toString("hex");
	passwordHashes.hash = crypto.pbkdf2Sync(password, salt, 10000, 512, "sha512").toString("hex");

	return passwordHashes;
}


module.exports = usersRules;