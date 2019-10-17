
var sql = require("../lib/coreVendor/betterSqlite/sql");

var usersFavoriteArticlesStore = {};

usersFavoriteArticlesStore.addUserIdArticleId = function(userId, articleId) {

	var id = sql.executeNonQuery(`
		INSERT INTO UsersFavoriteArticles (userId, articleId)
		VALUES (@userId, @articleId)`,
		{ userId, articleId });

	return id;
}

usersFavoriteArticlesStore.removeUserIdArticleId = function(userId, articleId) {

	sql.executeNonQuery(`
		DELETE FROM UsersFavoriteArticles		
		WHERE userId = @userId AND articleId = @articleId`,
		{ userId, articleId });
}


module.exports = usersFavoriteArticlesStore;