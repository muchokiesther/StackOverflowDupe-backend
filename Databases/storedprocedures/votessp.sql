-- Stored procedure for upvoting
CREATE OR ALTER PROCEDURE upvoting
  @voteId VARCHAR(255),
  @userId VARCHAR(255),
  @answerId VARCHAR(255)
AS
BEGIN
  -- Check if the vote exists
  IF EXISTS (SELECT 1 FROM VOTES WHERE  answerId = @answerId AND userId = @userId)
  BEGIN
    -- Check if the user has already upvoted
    IF EXISTS (SELECT 1 FROM VOTES WHERE answerId = @answerId AND userId = @userId AND upVotes > 0)
    BEGIN
      -- Remain the same (already upvoted)
      RETURN;
    END
    -- Check if the user has already downvoted
    ELSE IF EXISTS (SELECT 1 FROM VOTES WHERE  answerId = @answerId AND userId = @userId AND downVotes > 0)
    BEGIN
      -- Update the downVotes to zero and increment the upVotes by one
      UPDATE VOTES SET downVotes = 0, upVotes = upVotes + 1 WHERE  answerId = @answerId AND userId = @userId;
    END
    ELSE
    BEGIN
      -- Increment the upVotes by one
      UPDATE VOTES SET upVotes = upVotes + 1 WHERE  answerId = @answerId AND userId = @userId;
    END
  END
  ELSE
  BEGIN
    -- Insert a new vote with upVotes set to 1
    INSERT INTO VOTES (voteId, userId, answerId, upVotes) VALUES (@voteId, @userId, @answerId, 1);
  END
END;
GO


-- Stored procedure for downvoting
CREATE OR ALTER PROCEDURE downvote
  @voteId VARCHAR(255),
  @userId VARCHAR(255),
  @answerId VARCHAR(255)
AS
BEGIN
  -- Check if the vote exists
  IF EXISTS (SELECT 1 FROM VOTES  WHERE answerId = @answerId AND userId = @userId )
  BEGIN
    -- Check if the user has already upvoted
    IF EXISTS (SELECT 1 FROM VOTES  WHERE answerId = @answerId AND userId = @userId  AND upVotes > 0)
    BEGIN
      -- Update the upVotes to zero and increment the downVotes by one
      UPDATE VOTES SET upVotes = 0, downVotes = downVotes + 1 WHERE answerId = @answerId AND userId = @userId 
    END
    ELSE
    BEGIN
      --REMAIN THE SAME
     RETURN;
    END
  END
  ELSE
  BEGIN
    -- Insert a new vote with downVotes set to 1
    INSERT INTO VOTES (voteId, userId, answerId, downVotes) VALUES (@voteId, @userId, @answerId, 1);
  END
END;
GO


SELECT * FROM VOTES