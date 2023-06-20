--addquestiontags
USE STACKOVERFLOW
CREATE OR ALTER PROCEDURE addQuestionTag
(
  @tagId VARCHAR(255),
  @questionsId VARCHAR(255)
)
AS
BEGIN
INSERT INTO QUESTIONTAGS(tagId ,questionsId)VALUES( @tagId,@questionsId)

END


--getQuestiontag

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
--getAllquestions
CREATE OR ALTER PROCEDURE getAllquestions

AS
BEGIN
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId 
  WHERE Q.isDeleted=0
END;



--getquestionsByuserid
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
--updateQuestion
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

--updatequetiontags
CREATE OR ALTER PROCEDURE updatequetiontags(@tagId VARCHAR(255) , @questionsId VARCHAR(255))
AS
BEGIN
DELETE  FROM QUESTIONTAGS  
INSERT INTO QUESTIONTAGS (tagId,questionsId) 
 VALUES(@tagId, @questionsId)
END
--deleteQuestion
CREATE OR ALTER PROCEDURE deleteQuestion(@questionsId VARCHAR(255))
AS
BEGIN
DELETE  FROM QUESTIONS 
END
--
CREATE OR ALTER PROCEDURE deleteQuestion(@questionsId VARCHAR(255))
AS
BEGIN
UPDATE	QUESTIONS SET isDeleted=1 WHERE questionsId=@questionsId AND isDeleted =0

END
--deleteQuestionTag
CREATE OR ALTER PROCEDURE deleteQuestionTag(@questionsId VARCHAR(255), @tagId VARCHAR(255) )
AS
BEGIN
UPDATE	QUESTIONTAGS SET isDeleted=1 WHERE questionsId=@questionsId AND  tagId=@tagId AND isDeleted =0
END

ALTER TABLE QUESTIONTAGS 
ADD isDeleted INT DEFAULT 0;

SELECT * FROM QUESTIONS