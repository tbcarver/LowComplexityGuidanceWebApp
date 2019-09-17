
CREATE TABLE Logs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    logMessage TEXT NOT NULL,
    requestUrl TEXT,
    username TEXT,
    stack TEXT,
	createdTimestamp TEXT NOT NULL
);