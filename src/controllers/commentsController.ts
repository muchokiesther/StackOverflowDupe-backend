import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelpers'
import { DecodedData, commentsExtendedRequest } from '../interfaces';
export const addComment = async (req: commentsExtendedRequest, res: Response) => {
    try {
      const { body } = req.body;
      const { answerid, userId } = req.params;
      const commentId = uuid(); 
      
      await DatabaseHelper.exec('addComment', {
        commentId: commentId,
        answerid: answerid,
        userId: userId,
        body: body
      });
  
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
