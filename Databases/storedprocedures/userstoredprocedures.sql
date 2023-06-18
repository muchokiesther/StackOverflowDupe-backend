-- stored procedures
USE STACKOVERFLOW
--getusers
CREATE OR ALTER PROCEDURE getUsers
AS 
BEGIN

SELECT * FROM USERS WHERE isDeleted=0
END

--add users
CREATE OR ALTER PROCEDURE addUser(
@userId VARCHAR(255),@userName VARCHAR(255),
@email VARCHAR(255),@password VARCHAR(255)
)
AS
BEGIN
INSERT INTO USERS (userId,userName,email,password) VALUES(@userId,@userName,@email,@password)
END

--updateuser
CREATE OR ALTER PROCEDURE updateUser
(
@userId VARCHAR(255),@userName VARCHAR(255),
@email VARCHAR(255),@password VARCHAR(255)
)
AS 
BEGIN
UPDATE USERS SET userName=@userName, email=@email, password=@password WHERE userId=@userId AND isDeleted=0
END

--getuserbyemail

CREATE OR ALTER PROCEDURE getUserByEmail(@email VARCHAR(200))
AS
BEGIN
SELECT * FROM USERS WHERE  email=@email AND isDeleted=0
END

--getuserbyid

CREATE OR ALTER PROCEDURE getUserById(@userId VARCHAR(200))
AS
BEGIN
SELECT * FROM USERS WHERE  userId=@userIdId AND isDeleted=0
END

--delete users
CREATE OR ALTER PROCEDURE deleteUser(@userId VARCHAR(200))
AS
BEGIN

UPDATE USERS SET isDeleted=1 WHERE userid=@userId AND isDeleted =0

END
