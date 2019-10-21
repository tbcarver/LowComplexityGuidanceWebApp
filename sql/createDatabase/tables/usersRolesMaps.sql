
CREATE TABLE UsersRolesMaps (
    usersRoleMapId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL REFERENCES Users (userId),
    roleId INTEGER NOT NULL REFERENCES Roles (roleId),
    UNIQUE (userId, roleId)
);

INSERT INTO UsersRolesMaps (userId, roleId) VALUES (1, 1);
INSERT INTO UsersRolesMaps (userId, roleId) VALUES (2, 2);