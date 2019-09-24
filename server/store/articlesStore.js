
var sql = require("../lib/coreVendor/betterSqlite/sql");

var articlesStore = {};

articlesStore.addArticle = function(articleTitle, articleDescription, articleBody, authorId) {

	var id = sql.executeNonQuery(`
		INSERT INTO Articles (articleTitle, articleDescription, articleBody, authorId)
		VALUES (@articleTitle, @articleDescription, @articleBody, @authorId)`,
		{ articleTitle, articleDescription, articleBody, authorId });

	return id;
}

articlesStore.getDescendingPagedArticles = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT articleId, articleTitle, articleDescription, articleBody, authorId, createdTimestamp, updatedTimestamp
		FROM Articles
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
		SELECT articleId, articleTitle, articleDescription, articleBody, authorId, createdTimestamp, updatedTimestamp
		FROM Articles
		WHERE articleId = @articleId`,
		{ articleId });

	return result;
}

articlesStore.getCount = function() {

	return sql.executeScalar('SELECT COUNT(*) FROM Articles');
}


module.exports = articlesStore;