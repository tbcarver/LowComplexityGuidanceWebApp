
var sql = require("../../lib/coreVendor/betterSqlite/sql");
var WhereClause = require("../../lib/core/sql/whereClause");
var usersFavoriteArticlesStore = require("./usersFavoriteArticlesStore");

var articlesStore = {};

articlesStore.getArticle = function(articleId) {

	var results = sql.executeRow(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId, createdDate,
			updatedDate
		FROM Articles
		WHERE articleId = @articleId`,
	{ articleId });

	return results;
};

articlesStore.getExtendedArticle = function(articleId, favoriteUserId) {

	if (!favoriteUserId) {
		favoriteUserId = 0;
	}

	var results = sql.executeRow(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId,
			Articles.createdDate, Articles.updatedDate, firstName, lastName,
			(SELECT COUNT(*) FROM UsersFavoriteArticles
			 WHERE UsersFavoriteArticles.articleId = Articles.articleId) as countFavorites,
			(SELECT 1 FROM UsersFavoriteArticles
			 WHERE UsersFavoriteArticles.articleId = Articles.articleId
				AND UsersFavoriteArticles.userId = @favoriteUserId) as isUserFavorite
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId = @articleId`,
	{ articleId, favoriteUserId });

	return results;
};

articlesStore.getDescendingPagedExtendedArticles = function(pageNumber, pageSize, favoriteUserId, authorId) {

	if (!favoriteUserId) {
		favoriteUserId = 0;
	}

	var parameters = sql.getLimitOffset(pageNumber, pageSize);
	parameters.favoriteUserId = favoriteUserId;

	var whereClause = new WhereClause();
	whereClause.addAndClause("authorId = @authorId", "authorId", authorId);

	var results = sql.executeQuery(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId,
			Articles.createdDate, Articles.updatedDate, firstName, lastName,
			(SELECT COUNT(*) FROM UsersFavoriteArticles
			 WHERE UsersFavoriteArticles.articleId = Articles.articleId) as countFavorites,
			(SELECT 1 FROM UsersFavoriteArticles
			 WHERE UsersFavoriteArticles.articleId = Articles.articleId
			 	AND UsersFavoriteArticles.userId = @favoriteUserId) as isUserFavorite
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId NOT IN (SELECT articleId FROM Articles
								${whereClause.buildWhere()}
								ORDER BY articleId DESC LIMIT @offset) ${whereClause.buildAnd()}
		ORDER BY articleId DESC LIMIT @limit`,
	Object.assign(parameters, whereClause.parameters));

	var total = 0;
	if (results.length > 0) {
		total = this.getCount(authorId);
	}

	results = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: results.length,
			total,
		},
		articles: results,
	};

	return results;
};

articlesStore.getCount = function(authorId) {

	var whereClause = new WhereClause();
	whereClause.addAndClause("authorId = @authorId", "authorId", authorId);

	var count = sql.executeScalar(`
		SELECT COUNT(*)
		FROM Articles
		${whereClause.buildWhere()}`,
	whereClause.parameters);

	return count;
};

articlesStore.addArticle = function(articleTitle, articleDescription, articleBody, iconCssClass, authorId) {

	var id = sql.executeNonQuery(`
		INSERT INTO Articles (articleTitle, articleDescription, articleBody, iconCssClass, authorId)
		VALUES (@articleTitle, @articleDescription, @articleBody, @iconCssClass, @authorId)`,
	{ articleTitle, articleDescription, articleBody, iconCssClass, authorId });

	return id;
};

articlesStore.updateArticle = function(articleId, articleTitle, articleDescription, articleBody, iconCssClass) {

	sql.executeNonQuery(`
		UPDATE Articles
		SET articleTitle = @articleTitle, articleDescription = @articleDescription, articleBody = @articleBody,
			iconCssClass = @iconCssClass
		WHERE articleId = @articleId`,
	{ articleId, articleTitle, articleDescription, articleBody, iconCssClass });
};

articlesStore.removeArticle = function(articleId) {

	sql.transaction(function() {

		usersFavoriteArticlesStore.removeFavoriteArticlesByArticleId(articleId);

		sql.executeNonQuery(`
			DELETE FROM Articles
			WHERE articleId = @articleId`,
		{ articleId });
	});
};

module.exports = articlesStore;