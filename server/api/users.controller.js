
var usersStore = require("../store/usersStore");
var usersFavoriteArticlesStore = require("../store/usersFavoriteArticlesStore");
var queryStringKeys = require("../keys/queryStringKeys");
var _ = require("lodash");

function initialize(app, acl) {

	// Acl noop
	app.get("/api/users/typeahead/prefetch", getUsersTypeaheadPrefetch);
	app.get("/api/users/typeahead/remote", getUsersTypeaheadRemote);

	acl.allow("authenticated exact", "/api/users/favoriteArticle/add", "*");
	app.post("/api/users/favoriteArticle/add", addFavoriteArticle);

	acl.allow("authenticated exact", "/api/users/favoriteArticle/remove", "*");
	app.post("/api/users/favoriteArticle/remove", removeFavoriteArticle);
}

function getUsersTypeaheadPrefetch(req, res) {

	var users = usersStore.getUsers();

	users = users.map(function(user) {
		return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
	});

	res.json(users);
}

function getUsersTypeaheadRemote(req, res) {

	var searchTerm = req.query[queryStringKeys.searchTerm];
	var users;

	if (searchTerm) {

		users = usersStore.searchUsers(searchTerm);

		users = users.map(function(user) {    
			return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
		});
	}

	res.json(users);
}

function addFavoriteArticle(req, res) {

	if (req.body.userId) {
		usersFavoriteArticlesStore.replaceUserIdArticleId(req.body.userId, req.body.articleId);
		res.send("Favorite added.");
	} else {
		res.send(400, "UserId or articleId invalid.");
	}
}

function removeFavoriteArticle(req, res) {

	if (req.body.userId && req.body.articleId) {
		usersFavoriteArticlesStore.removeUserIdArticleId(req.body.userId, req.body.articleId);
		res.send("Favorite removed.");
	} else {
		res.send(400, "UserId or articleId invalid.");
	}
}

module.exports.initialize = initialize;