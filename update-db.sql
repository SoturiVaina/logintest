USE login_db;

TRUNCATE users;

ALTER TABLE users 
	CHANGE COLUMN name username VARCHAR(30) NOT NULL,
	MODIFY COLUMN email VARCHAR(30) NOT NULL,
	MODIFY COLUMN password VARCHAR(255) NOT NULL;