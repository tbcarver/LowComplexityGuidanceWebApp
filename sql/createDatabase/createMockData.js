
require("dotenv").config();

var articlesStore = require("../../server/store/articlesStore");
var usersStore = require("../../server/store/usersStore");
var usersRules = require("../../server/rules/usersRules");
var faker = require("faker");

var totalRows = 125;

initialize();

var passwordHashes = usersRules.buildPasswordHashes("1234");

for (var count = 1; count <= totalRows; count++) {

	var firstName = faker.name.firstName();
	var lastName = faker.name.lastName();
	var username = firstName + lastName;

	var userId = usersStore.addUser(username, firstName, lastName, passwordHashes.passwordHash, passwordHashes.passwordHashSalt);
	console.log("Added userId: " + userId);
}

for (var count = 1; count <= totalRows; count++) {

	var userId = faker.random.number({ min: 1, max: Math.floor(totalRows / 3) });
	var articleId = articlesStore.addArticle(getWords(2, 4), getWords(6, 8), getParagraphs(1, 4), getIconCssClass(), userId);
	console.log("Added articleId: " + articleId);
}


function getWords(min, max) {

	var number = faker.random.number({ min: min, max: max });

	return faker.lorem.words(number);
}

function getParagraphs(min, max) {

	var number = faker.random.number({ min: min, max: max });

	return faker.lorem.paragraphs(number, "\n\r\n\r");
}

function getIconCssClass() {

	var index = faker.random.number({ min: 0, max: iconsCssClasses.length - 1 });

	return iconsCssClasses[index];
}

// NOTE: The iconsCssClasses is global and wrapped in the function so it can appear at the bottom of the script
function initialize() {
	iconsCssClasses = [
		"fas fa-angry",
		"far fa-angry",
		"fas fa-dizzy",
		"far fa-dizzy",
		"fas fa-flushed",
		"far fa-flushed",
		"fas fa-frown",
		"far fa-frown",
		"fas fa-frown-open",
		"far fa-frown-open",
		"fas fa-grimace",
		"far fa-grimace",
		"fas fa-grin",
		"far fa-grin",
		"fas fa-grin-alt",
		"far fa-grin-alt",
		"fas fa-grin-beam",
		"far fa-grin-beam",
		"fas fa-grin-beam-sweat",
		"far fa-grin-beam-sweat",
		"fas fa-grin-hearts",
		"far fa-grin-hearts",
		"fas fa-grin-squint",
		"far fa-grin-squint",
		"fas fa-grin-squint-tears",
		"far fa-grin-squint-tears",
		"fas fa-grin-stars",
		"far fa-grin-stars",
		"fas fa-grin-tears",
		"far fa-grin-tears",
		"fas fa-grin-tongue",
		"far fa-grin-tongue",
		"fas fa-grin-tongue-squint",
		"far fa-grin-tongue-squint",
		"fas fa-grin-tongue-wink",
		"far fa-grin-tongue-wink",
		"fas fa-grin-wink",
		"far fa-grin-wink",
		"fas fa-kiss",
		"far fa-kiss",
		"fas fa-kiss-beam",
		"far fa-kiss-beam",
		"fas fa-kiss-wink-heart",
		"far fa-kiss-wink-heart",
		"fas fa-laugh",
		"far fa-laugh",
		"fas fa-laugh-beam",
		"far fa-laugh-beam",
		"fas fa-laugh-squint",
		"far fa-laugh-squint",
		"fas fa-laugh-wink",
		"far fa-laugh-wink",
		"fas fa-meh",
		"far fa-meh",
		"fas fa-meh-blank",
		"far fa-meh-blank",
		"fas fa-meh-rolling-eyes",
		"far fa-meh-rolling-eyes",
		"fas fa-sad-cry",
		"far fa-sad-cry",
		"fas fa-sad-tear",
		"far fa-sad-tear",
		"fas fa-smile",
		"far fa-smile",
		"fas fa-smile-beam",
		"far fa-smile-beam",
		"fas fa-smile-wink",
		"far fa-smile-wink",
		"fas fa-surprise",
		"far fa-surprise",
		"fas fa-tired",
		"far fa-tired",
	];
}