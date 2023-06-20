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


CREATE OR ALTER PROCEDURE addquestiontag
(
  @questionsId VARCHAR(255),@tagId VARCHAR(255)
)
AS
BEGIN
 INSERT INTO QUESTIONTAGS (tagId,questionsId) 
 VALUES(@tagId, @questionsId)
 
END;

ALTER TABLE TAGS
DROP COLUMN body;


INSERT INTO TAGS (tagId,tagName) VALUES(1,'Java'),(2,'HTML'),(3,'CSS'),(4,'JAVASCRIPT')


SELECT * FROM TAGS
SELECT * FROM QUESTIONS

SELECT * FROM QUESTIONTAGS


CREATE OR ALTER PROCEDURE getOnequestions
(
  @questionsId VARCHAR(255)
)
AS
BEGIN
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId
  WHERE Q.questionsId = @questionsId AND Q.isDeleted=0
END;

CREATE OR ALTER PROCEDURE getAllquestions

AS
BEGIN
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId 
  WHERE Q.isDeleted=0
END;




CREATE OR ALTER PROCEDURE getquestionsByuserid
(
  @userId VARCHAR(255)
)
AS
BEGIN
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId
  WHERE Q.userId = @userId AND Q.isDeleted=0
END;

CREATE OR ALTER PROCEDURE updateQuestion
(
  @questionId VARCHAR(255),
  @title VARCHAR(255),
  @body TEXT
)
AS
BEGIN
  UPDATE QUESTIONS
  SET title = @title,
      body = @body
  WHERE questionsId = @questionId;
END;


CREATE OR ALTER PROCEDURE updatequetiontags(@tagId VARCHAR(255) , @questionsId VARCHAR(255))
AS
BEGIN
DELETE  FROM QUESTIONTAGS  
INSERT INTO QUESTIONTAGS (tagId,questionsId) 
 VALUES(@tagId, @questionsId)
END

CREATE OR ALTER PROCEDURE deleteQuestion(@questionsId VARCHAR(255))
AS
BEGIN
DELETE  FROM QUESTIONS 
END

CREATE OR ALTER PROCEDURE deleteQuestion(@questionsId VARCHAR(255))
AS
BEGIN
UPDATE	QUESTIONS SET isDeleted=1 WHERE questionsId=@questionsId AND isDeleted =0

END

CREATE OR ALTER PROCEDURE deleteQuestionTag(@questionsId VARCHAR(255), @tagId VARCHAR(255) )
AS
BEGIN
UPDATE	QUESTIONTAGS SET isDeleted=1 WHERE questionsId=@questionsId AND  tagId=@tagId AND isDeleted =0
END

ALTER TABLE QUESTIONTAGS 
ADD isDeleted INT DEFAULT 0;

SELECT * FROM QUESTIONS
SELECT * FROM ANSWERS

CREATE OR ALTER PROCEDURE addAnswer(@answerId VARCHAR(255),@questionsId VARCHAR(255),@body VARCHAR(255),@userId VARCHAR(255))
AS
BEGIN
INSERT INTO ANSWERS (answerId,questionsId,body,userId)VALUES (@answerId,@questionsId ,@body,@userId)
END

select * from ANSWERS

CREATE OR ALTER PROCEDURE isPrefferedAnswer(@answerId VARCHAR(255))
AS
BEGIN

UPDATE ANSWERS SET isPreferred=1 WHERE  answerId=@answerId
END