
CREATE TABLE UsersFavoriteArticles (
    usersFavoriteId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL REFERENCES Users (userId),
    articleId INTEGER NOT NULL REFERENCES Articles (articleId),
    UNIQUE (userId, articleId)
);

INSERT INTO UsersRoles (userId, roleId) VALUES (1, 1);
INSERT INTO UsersRoles (userId, roleId) VALUES (2, 2);