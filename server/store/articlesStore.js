
var sql = require("../lib/coreVendor/betterSqlite/sql");
var WhereClause = require("../lib/core/sql/whereClause");
var usersFavoriteArticlesStore = require("./usersFavoriteArticlesStore");

var articlesStore = {};

articlesStore.getDescendingPagedExtendedArticles = function(pageNumber, pageSize, favoriteUserId, authorIdFilter) {

	if (!favoriteUserId) {
		favoriteUserId = 0;
	}

	var parameters = sql.getLimitOffset(pageNumber, pageSize);
	parameters.favoriteUserId = favoriteUserId;

	var whereClause = new WhereClause();
	var whereParameters = {};
	if (authorIdFilter) {
		whereClause.addAndClause("authorId = @authorId");
		whereParameters.authorId = authorIdFilter;
	}

	var result = sql.executeQuery(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId,
			Articles.createdDate, Articles.updatedDate, firstName, lastName,
			(SELECT COUNT(*) FROM UsersFavoriteArticles WHERE UsersFavoriteArticles.articleId = Articles.articleId) as countFavorites,
			(SELECT 1 FROM UsersFavoriteArticles WHERE UsersFavoriteArticles.articleId = Articles.articleId AND UsersFavoriteArticles.userId = @favoriteUserId) as isUserFavorite
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId NOT IN (SELECT articleId FROM Articles
								${whereClause.buildWhere()}
								ORDER BY articleId DESC LIMIT @offset) ${whereClause.buildAnd()}
		ORDER BY articleId DESC LIMIT @limit`,
		Object.assign(parameters, whereParameters));

	var total = 0;
	if (result.length > 0) {
		total = this.getCount(whereClause, whereParameters);
	}

	result = {
		pagination: {
			pageNumber,
			pageSize,
			pageTotal: result.length,
			total,
		},
		articles: result,
	};

	return result;
}

articlesStore.getArticle = function(articleId) {

	var result = sql.executeRow(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId, createdDate, updatedDate
		FROM Articles
		WHERE articleId = @articleId`,
		{ articleId });

	return result;
}

articlesStore.getExtendedArticle = function(articleId, favoriteUserId) {

	if (!favoriteUserId) {
		favoriteUserId = 0;
	}

	var result = sql.executeRow(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId,
			Articles.createdDate, Articles.updatedDate, firstName, lastName,
			(SELECT COUNT(*) FROM UsersFavoriteArticles WHERE UsersFavoriteArticles.articleId = Articles.articleId) as countFavorites,
			(SELECT 1 FROM UsersFavoriteArticles WHERE UsersFavoriteArticles.articleId = Articles.articleId AND UsersFavoriteArticles.userId = @favoriteUserId) as isUserFavorite
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId = @articleId`,
		{ articleId, favoriteUserId });

	return result;
}

articlesStore.getCount = function(whereClause, whereParameters) {

	var count = sql.executeScalar(`
		SELECT COUNT(*)
		FROM Articles
		${whereClause.buildWhere()}`,
		whereParameters);

	return count;
}

articlesStore.addArticle = function(articleTitle, articleDescription, articleBody, iconCssClass, authorId) {

	var id = sql.executeNonQuery(`
		INSERT INTO Articles (articleTitle, articleDescription, articleBody, iconCssClass, authorId)
		VALUES (@articleTitle, @articleDescription, @articleBody, @iconCssClass, @authorId)`,
		{ articleTitle, articleDescription, articleBody, iconCssClass, authorId });

	return id;
}

articlesStore.updateArticle = function(articleId, articleTitle, articleDescription, articleBody, iconCssClass) {

	sql.executeNonQuery(`
		UPDATE Articles
		SET articleTitle = @articleTitle, articleDescription = @articleDescription, articleBody = @articleBody, iconCssClass = @iconCssClass
		WHERE articleId = @articleId`,
		{ articleId, articleTitle, articleDescription, articleBody, iconCssClass });
}

articlesStore.deleteArticle = function(articleId) {

	sql.transaction(function() {

		usersFavoriteArticlesStore.removeFavoriteArticlesByArticleId(articleId);

		sql.executeNonQuery(`
			DELETE FROM Articles
			WHERE articleId = @articleId`,
			{ articleId });
	});
}


module.exports = articlesStore;