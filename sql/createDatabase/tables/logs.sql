
CREATE TABLE Logs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    logLevel TEXT NOT NULL,
    logMessage TEXT NOT NULL,
    httpStatus INTEGER,
    requestUrl TEXT,
    username TEXT,
    stack TEXT,
	createdDate TEXT NOT NULL
);