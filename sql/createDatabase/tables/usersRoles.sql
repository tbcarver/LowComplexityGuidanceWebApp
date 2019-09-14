
CREATE TABLE UsersRoles (
    usersRolesId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL REFERENCES Users (userId),
    roleID INTEGER NOT NULL REFERENCES Roles (roleId)
);

INSERT INTO UsersRoles (userId, roleID) VALUES (1, 1);