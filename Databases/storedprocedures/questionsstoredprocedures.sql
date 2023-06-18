--add a question
CREATE OR ALTER PROCEDURE addQuestion
(@questionsId VARCHAR(255),@userId VARCHAR(255),
@title VARCHAR(255),@body TEXT
)
AS
BEGIN
INSERT INTO QUESTIONS (questionsId,userId,title,body) VALUES (@questionsId,@userId,@title,@body)
END


--get all questions
CREATE OR ALTER PROCEDURE getQuestions
AS
BEGIN
SELECT * FROM QUESTIONS WHERE isDeleted=0
END


--get one question 
CREATE OR ALTER PROCEDURE getQuestion
  @questionsId VARCHAR(255)
AS
BEGIN
  SELECT * FROM QUESTIONS WHERE questionsId = @questionsId AND isDeleted = 0;
END;



--update a question
CREATE OR ALTER PROCEDURE updateQuestions(@questionsId VARCHAR(255),@userId VARCHAR(255),
@title VARCHAR(255),@body TEXT
)
AS
BEGIN
UPDATE QUESTIONS SET questionsId=@questionsId ,userId=@userId ,title=@title ,body=@body WHERE questionsId=@questionsId AND isDeleted=0
END


--delete question
CREATE OR ALTER PROCEDURE deleteQuestion(@questionsId VARCHAR(255))
AS 
BEGIN
UPDATE QUESTIONS SET isDeleted=1 WHERE questionsId=@questionsId AND isDeleted=1
END



