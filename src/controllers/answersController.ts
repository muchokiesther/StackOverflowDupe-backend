import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelpers'
import { DecodedData, answersExtendedRequest, questions } from '../interfaces';
import userRoutes from '../Routes/userRoutes';
//add comment

export const addAnswer = async (req: answersExtendedRequest, res: Response) => {
    try {
      const { body } = req.body;
      const  userId  = req.info?.userId as string;
      const {  questionId } = req.params;
      const answerId = uid();
    (await DatabaseHelper.exec('addAnswer', {
        answerId: answerId,
        userId: userId,
        questionsId: questionId,
        body: body,
        
      })).recordset;
  
      res.status(201).json({ message: 'Answer added successfully' })
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  export const setPreferred = async (req: answersExtendedRequest, res: Response) => {
    try {
      const { answerId } = req.params;
     const userId = req.info?.userId
      const answerResult = (await DatabaseHelper.exec('getAnswerByAnswerId', { answerId })).recordset;
  
      if (answerResult.length === 0) {
        return res.status(404).json({ error: 'Answer not found' });
      }
      //console.log(answerResult);
      
  
      const questionsId = answerResult[0].questionsId;
  
      const questionResult:questions = (await DatabaseHelper.exec('getOneQuestions', { questionsId })).recordset[0];
  
      if (!questionResult) {
        return res.status(404).json({ error: 'Question not found' });
      }
      if (questionResult.userId === userId){
        (await DatabaseHelper.exec('isPrefferedAnswer', { answerId })).recordset; 
  
        res.status(200).json({ message: 'Answer marked as preferred' });
      }else{ res.status(404).json({ error: 'Not your question' });}
      
    } catch (error) {
      console.error('Error marking answer as preferred:', error);
      res.status(500).json({ error: 'Internal erver error' });
    }
  };

  export const getAnswersForQuestion = async (req: Request, res: Response) => {
    try {
      const { questionId } = req.params;
  
      const result = (await DatabaseHelper.exec('GetAnswersForQuestion', { questionId })).recordset;
  
      res.status(200).json( result );
    } catch (error) {
      console.error('Error retrieving answers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  //get one answer by userID

  export const getAnswerForUserQuestion = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
  
      const result = (await DatabaseHelper.exec('getAnswerByUserId', { userId })).recordset;
  console.log(userId)
      res.status(200).json( result );
    } catch (error) {
      console.error('Error retrieving answers:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };