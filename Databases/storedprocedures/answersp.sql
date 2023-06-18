--add answer

CREATE OR ALTER PROCEDURE addAnswer(@answerId VARCHAR(255),@questionsId VARCHAR(255),@body VARCHAR(255))
AS
BEGIN
INSERT INTO ANSWERS (answerId,questionsId,body)VALUES (@answerId,@questionsId ,@body)
END


--get all answers
CREATE OR ALTER PROCEDURE getAllAnswers
AS
BEGIN
SELECT * FROM ANSWERS WHERE isDeleted=0

END


--get one answer
CREATE OR ALTER PROCEDURE getAnswer(@answerId VARCHAR(255))
AS
BEGIN
SELECT * FROM ANSWERS WHERE answerId=@answerId AND  isDeleted=0

END


--delete answer
CREATE OR ALTER PROCEDURE deleteAnswer(@answerId VARCHAR(255))
AS
BEGIN

UPDATE ANSWERS SET isDeleted=1 WHERE answerId=@answerId AND isDeleted =0

END