
CREATE TABLE Inmates (
    inmateId INTEGER PRIMARY KEY AUTOINCREMENT,
    inmateNumber INTEGER UNIQUE NOT NULL,
    firstName TEXT,
    lastName TEXT, 
    housingUnit TEXT,
    bunk TEXT,
    utopiaId INTEGER,
    dateGED TEXT,
    dateGrad TEXT,
    completedPaperWork INTEGER,
    educationStatus TEXT,    
    readingScore INTEGER,
    mathScore INTEGER,
    testDate TEXT,
    civicStatus TEXT,
    civicStatusDate TEXT,
    essayStatus TEXT,
    essayStatusDate TEXT,
    CHS TEXT,
    classification TEXT,
    PML TEXT,
    employmentEligibility TEXT,
    jobAssignment TEXT,
    createdDate TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO Inmates (inmateNumber, firstName, lastName, housingUnit, bunk, utopiaId, dateGED, dateGrad, completedPaperWork, educationStatus, readingScore, mathScore, testDate, civicStatus, civicStatusDate, essayStatus, essayStatusDate, CHS, classification, PML, employmentEligibility, jobAssignment)
VALUES (123456, 'John', 'Wilson', 'CUCF Gale', 'DD1', 123456, null, '1/1/1996', 1, 'Complete', 252, 238, '5/5/2019', null, null, null, null, 'Tom Lamb', 'kq5', '4L', 'All-GHT', 'Tutor')