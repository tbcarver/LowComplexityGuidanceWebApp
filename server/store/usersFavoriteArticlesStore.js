
var sql = require("../../lib/coreVendor/betterSqlite/sql");

var usersFavoriteArticlesStore = {};

usersFavoriteArticlesStore.addUserIdArticleId = function(userId, articleId) {

	sql.executeNonQuery(
		`INSERT INTO UsersFavoriteArticles (userId, articleId)
		VALUES (@userId, @articleId)`,
		{ userId, articleId });
};

usersFavoriteArticlesStore.replaceUserIdArticleId = function(userId, articleId) {

	sql.transaction(function() {

		usersFavoriteArticlesStore.removeUserIdArticleId(userId, articleId);

		sql.executeNonQuery(
			`INSERT INTO UsersFavoriteArticles (userId, articleId)
			VALUES (@userId, @articleId)`,
			{ userId, articleId });
	});
};

usersFavoriteArticlesStore.removeUserIdArticleId = function(userId, articleId) {

	sql.executeNonQuery(
		`DELETE FROM UsersFavoriteArticles		
		WHERE userId = @userId AND articleId = @articleId`,
		{ userId, articleId });
};

usersFavoriteArticlesStore.removeFavoriteArticlesByUserId = function(userId) {

	sql.executeNonQuery(
		`DELETE FROM UsersFavoriteArticles		
		WHERE userId = @userId`,
		{ userId });
};

usersFavoriteArticlesStore.removeFavoriteArticlesByArticleId = function(articleId) {

	sql.executeNonQuery(
		`DELETE FROM UsersFavoriteArticles		
		WHERE articleId = @articleId`,
		{ articleId });
};

module.exports = usersFavoriteArticlesStore;