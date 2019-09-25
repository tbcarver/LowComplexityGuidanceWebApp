CREATE TABLE Articles(
	articleId INTEGER PRIMARY KEY AUTOINCREMENT,
	articleTitle TEXT NOT NULL,
	articleDescription TEXT NOT NULL,
	articleBody TEXT NOT NULL,
	iconCssClass TEXT NOT NULL,
	authorId INTEGER NOT NULL,
	createdTimestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updatedTimestamp TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);