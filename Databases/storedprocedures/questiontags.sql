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

CREATE OR ALTER PROCEDURE getQuestionTag(@questionsId VARCHAR(255))
AS
BEGIN
SELECT * FROM QUESTIONTAGS WHERE questionsId=@questionsId
END


CREATE OR ALTER PROCEDURE getAllquestions
(
  @questionsId VARCHAR(255)
)
AS
BEGIN
  SELECT Q.questionsId, Q.title, Q.body, T.tagId, T.tagName, T.body
  FROM QUESTIONS Q
  INNER JOIN QUESTIONTAGS QT ON Q.questionsId = QT.questionsId
  INNER JOIN TAGS T ON QT.tagId = T.tagId
  WHERE Q.questionsId = @questionsId;
END;
