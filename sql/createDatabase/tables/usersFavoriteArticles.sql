
CREATE TABLE UsersFavoriteArticles (
    usersFavoriteId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL REFERENCES Users (userId),
    articleId INTEGER NOT NULL REFERENCES Articles (articleId),
    UNIQUE (userId, articleId)
);