
CREATE TABLE Logs (
    logId INTEGER PRIMARY KEY AUTOINCREMENT,
    logLevel TEXT NOT NULL,
    logMessage TEXT NOT NULL,
    httpStatus INTEGER,
    requestUrl TEXT,
    userId INTEGER, -- No foreign key to allow user delete
    username TEXT, -- No foreign key to allow user delete
    stack TEXT,
	createdDate TEXT NOT NULL
);