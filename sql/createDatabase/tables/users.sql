
CREATE TABLE Users (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    passwordHash TEXT NOT NULL,
    passwordHashSalt TEXT NOT NULL,
    createdDate TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- tempadmin with password tempAdmin
INSERT INTO Users (userId, username, firstName, lastName, passwordHash, passwordHashSalt) VALUES (1, 'tempadmin', 'temp admin', '(delete me)', '64d4ac234fcaf5bae30ed6a7d74acb3ed3de2abb6a8afb1a62976d4ed83b569e4077e264249dafc0b7dbc36099c5f1463aa253cc1d6f1c8630eeea7fe309b69d4459a70c3d2e8c88551a9ec10aaab7bdb7969c0fa69070f070f908106abfe6f761d6eae7a954ca0ea7b99b3cf6b3e13454aa405f925fcc9983645897c469db77164ac28ce374b0b207e9ad747efaac4c488ae296d394a63ef35987a1237b7d6e1d738435fff9075a2075fb1cb0932a01e7e5aed34b3bcff115530c0856e0983b75dc7b48a7474f5ea28eae23c7e4cc84183f79a9513bf2ee8a6c74c1469ebdde28ea7859e41a82e1e47b8037c7959bcdef447e81435d100a6102e0754f434d849236e4686ec76a90472ce9c08538e52596f8ea28c17cbba2b4dfe0d061596adfb6ad42ecec527c317de7961f81c2951fb763f8ae71ac10dbb53019ac3472fda5355e04aa8a8e4174839bf58392f2c7d73678317c5a140cbbd160c808469aa7c53ea96888e57712497d9d28b76977620e4546072ceee38f8bb787c726ca0444040b160137e6c51b2942b3b93f382033a07319795a1261bcafed0e73597dc58d1840a189c4de94e5ea0b3169585c817dd1d316200b487391909a357fd9d410ed00ff4c69ae49f33fb5bd2aa3034f6a2a2a73327897ac28491ec505dafb5f57527306b679ae67049b0c045098168f29ea9e27ff323e046e9972bc033b3b464db093', 'ce457c72c78b865723601c757772abfe');
