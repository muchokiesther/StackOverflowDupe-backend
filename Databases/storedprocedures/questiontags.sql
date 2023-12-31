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
(@pageNumber INT )
AS
BEGIN
DECLARE @pageSize INT = 15
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId 
  WHERE Q.isDeleted=0
  ORDER BY Q.questionsId 
  OFFSET (@pageNumber - 1) * @pageSize ROWS 
  FETCH NEXT @pageSize ROWS ONLY 
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
  @userId VARCHAR(255),
  @questionId VARCHAR(255),
  @title VARCHAR(255),
  @body TEXT
)
AS
BEGIN
  UPDATE QUESTIONS
  SET title = @title,
      body = @body
  WHERE questionsId = @questionId AND userId=@userId
END;

--updatequetiontags
CREATE OR ALTER PROCEDURE updatequetiontags(@tagId VARCHAR(255) , @questionsId VARCHAR(255))
AS
BEGIN
DELETE  FROM QUESTIONTAGS  
WHERE questionsId=@questionsId
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