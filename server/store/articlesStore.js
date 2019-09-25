
var sql = require("../lib/coreVendor/betterSqlite/sql");

var articlesStore = {};

articlesStore.addArticle = function(articleTitle, articleDescription, articleBody, iconCssClass, authorId) {

	var id = sql.executeNonQuery(`
		INSERT INTO Articles (articleTitle, articleDescription, articleBody, iconCssClass, authorId)
		VALUES (@articleTitle, @articleDescription, @articleBody, @iconCssClass, @authorId)`,
		{ articleTitle, articleDescription, articleBody, iconCssClass, authorId });

	return id;
}

articlesStore.getDescendingPagedRelationalArticles = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId, createdTimestamp, updatedTimestamp, firstName, lastName
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId NOT IN (SELECT articleId FROM Articles
							ORDER BY articleId DESC LIMIT @offset)
		ORDER BY articleId DESC LIMIT @limit`,
		limitOffset);

	var total = 0;
	if (result.length > 0) {
		total = this.getCount();
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
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId, createdTimestamp, updatedTimestamp
		FROM Articles
		WHERE articleId = @articleId`,
		{ articleId });

	return result;
}

articlesStore.getRelationalArticle = function(articleId) {

	var result = sql.executeRow(`
		SELECT articleId, articleTitle, articleDescription, articleBody, iconCssClass, authorId, createdTimestamp, updatedTimestamp, firstName, lastName
		FROM Articles
			INNER JOIN Users ON Articles.authorId = Users.userId
		WHERE articleId = @articleId`,
		{ articleId });

	return result;
}

articlesStore.getCount = function() {

	return sql.executeScalar('SELECT COUNT(*) FROM Articles');
}


module.exports = articlesStore;