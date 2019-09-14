
CREATE TABLE Roles (
    roleId INTEGER PRIMARY KEY AUTOINCREMENT,
    roleName TEXT UNIQUE NOT NULL
);

INSERT INTO Roles (roleId, roleName) VALUES (1, 'administrator');
INSERT INTO Roles (roleId, roleName) VALUES (2, 'contributor');
