--add votes 
CREATE OR ALTER PROCEDURE addVotes 
(
@VoteId VARCHAR(255) , 
@answerId VARCHAR(255),
@userId VARCHAR(255),
@upVotes INT,
@downVotes INT
)

AS
BEGIN

INSERT INTO VOTES (VoteId,answerId,userId,upVotes,downVotes)
VALUES(@VoteId, @answerId, @userId, @upVotes, @downVotes )

END



--get all votes

CREATE OR ALTER PROCEDURE getVotes
AS
BEGIN
SELECT * FROM VOTES WHERE isDeleted=0

END