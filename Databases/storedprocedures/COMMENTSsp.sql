--add comment

CREATE OR ALTER PROCEDURE addComment
(@commentId VARCHAR(255),@userId VARCHAR(255),@questionsId VARCHAR(255),
@answerId VARCHAR(255),@body TEXT)
AS
BEGIN
INSERT INTO COMMENTS(commentId ,userId,questionsId,answerId,body )VALUES(@commentId,@userId,@questionsId,@answerId,@body)
END


--delete comment 

CREATE OR ALTER  PROCEDURE deleteComment(@commentId VARCHAR(255))
AS
BEGIN

UPDATE COMMENTS SET isDeleted=1 WHERE commentId=@commentId AND isDeleted =1

END

--get all comments 
CREATE OR ALTER PROCEDURE getAllComments
AS
BEGIN
SELECT * FROM COMMENTS WHERE isDeleted=0

END

--get one comment 

CREATE OR ALTER PROCEDURE getComment(@commentId VARCHAR(200))
AS
BEGIN
SELECT * FROM COMMENTS WHERE commentId=@commentId AND  isDeleted=0

END