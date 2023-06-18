--add tags 
CREATE PROCEDURE addTag
(
  @tagId VARCHAR(255),
  @tagName VARCHAR(255),
  @body TEXT
)
AS
BEGIN
  INSERT INTO TAGS (tagId, tagName, body)
  VALUES (@tagId, @tagName, @body);
END;



--get all tags 

CREATE PROCEDURE getAllTags
AS
BEGIN
  SELECT * FROM TAGS;
END;


--update tags

CREATE PROCEDURE UpdateTag
(
  @tagId VARCHAR(255),
  @tagName VARCHAR(255),
  @body TEXT
)
AS
BEGIN
  UPDATE TAGS
  SET tagName = @tagName,
      body = @body
  WHERE tagId = @tagId AND isDeleted=0
END;
