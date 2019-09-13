
CREATE TABLE users (
    userId       INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    username     TEXT    UNIQUE NOT NULL,
    firstName    TEXT    NOT NULL,
    lastName     TEXT    NOT NULL,
    encryptedPassword     TEXT,
    passwordSalt TEXT
);
