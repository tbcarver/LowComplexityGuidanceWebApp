
var sql = require("../lib/coreVendor/betterSqlite/sql");

var articlesStore = {};

articlesStore.addArticle = function(title, articleDescription, body, authorId) {

	var id = sql.executeNonQuery(`
		INSERT INTO Articles (title, articleDescription, body, authorId)
		VALUES (@title, @articleDescription, @body, @authorId)`,
		{ title, articleDescription, body, authorId });

	return id;
}

articlesStore.getDescendingPagedArticles = function(pageNumber, pageSize) {

	var limitOffset = sql.getLimitOffset(pageNumber, pageSize);

	var result = sql.executeQuery(`
		SELECT articleId, title, articleDescription, body, authorId, createdTimestamp, updatedTimestamp
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
		SELECT articleId, title, articleDescription, body, authorId, createdTimestamp, updatedTimestamp
		FROM Articles
		WHERE articleId = @articleId`,
		{ articleId });

	return result;
}

articlesStore.getCount = function() {

	return sql.executeScalar('SELECT COUNT(*) FROM Articles');
}


module.exports = articlesStore;