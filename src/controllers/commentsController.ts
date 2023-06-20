import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelpers'
import { DecodedData, commentsExtendedRequest } from '../interfaces';
export const addComment = async (req: commentsExtendedRequest, res: Response) => {
    try {
      const { body } = req.body;
      const {answerid, userId ,questionsId, } = req.params;
      const commentId = uuid(); 
    
      (await DatabaseHelper.exec('addComment', {
        commentId: commentId,
        answerId: answerid,
        questionsId:questionsId,
        userId: userId,
        body: body
      })).recordset;
  
      res.status(201).json({ message: 'Comment added successfully' });
    } catch (error) {
      console.error('Error adding comment:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  export const getComments = async (req: commentsExtendedRequest, res: Response) => {

    try {
      const { answerid } = req.params;
  
      const result = (await DatabaseHelper.exec('getComments', {answerId:answerid })).recordset;
  console.log(answerid)
      res.status(200).json( result );
    } catch (error) {
      console.error('Error retrieving cooments:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  }
