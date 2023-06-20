import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelpers';
import { DecodedData, questionsExtendedRequest } from '../interfaces';


//add a question
export const addQuestion = async (req: questionsExtendedRequest, res: Response) => {
    try {
      const { title, body , TAGS} = req.body;
      const { userId } = req.params;
      const questionId = uid();
      await DatabaseHelper.exec('addQuestion', { questionsId: questionId, userId, title, body });

      TAGS.forEach(async(tag:{tagId:string;}) => {
        await DatabaseHelper.exec('addquestiontag',{tagId:tag.tagId, questionsId:questionId})
      });
      res.status(201).json({ message: 'Question added successfully' });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
//get all questions
export const getQuestions = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseHelper.exec('getAllquestions');
    const questions = result.recordset;
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

//get one question by qUESTION ID
export const getQuestion = async (req: Request, res: Response) => {
    try {
      const { questionsId } = req.params;
      const result = await DatabaseHelper.exec(
        'getOnequestions',
        { questionsId: questionsId } 
      );
      const question = result.recordset[0];
      if (!question) {
        res.status(404).json({ error: 'Question not found' });
      } else {
        res.status(200).json(question);
      }
    } catch (error) {
      console.error('Error retrieving question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  //get question posted by one user 
  export const getQuestionByUserid = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const result = await DatabaseHelper.exec(
        'getquestionsByuserid',
        { userId: userId } 
      );
      const question = result.recordset;
      if (!question) {
        res.status(404).json({ error: 'User Questions not found' });
      } else {
        res.status(200).json(question);
      }
    } catch (error) {
      console.error('Error retrieving questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //update a question 

export const updateQuestion = async (req: questionsExtendedRequest, res: Response) => {
  try {
    const {  questionId,userId} = req.params;
    const {  title, body ,TAGS } = req.body;
    await DatabaseHelper.exec('updateQuestion', { questionId,title, body });
    TAGS.forEach(async(tag:{tagId:string;}) => {
      await DatabaseHelper.exec('updatequetiontags',{tagId:tag.tagId, questionsId:questionId})
    });
    res.status(200).json({ message: 'Question updated successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};

 //delete quetsion
export const deleteQuestion = async (req: Request <{questionId:string}>, res: Response) => {
  try {
    const { questionId } = req.params;
    const result = await DatabaseHelper.exec(
      'getOnequestions',
      { questionsId: questionId } 
    );
    const question = result.recordset[0];
    if (!question) {
      res.status(404).json({ error: 'Question not found' });
    } else {
      await DatabaseHelper.exec('deleteQuestion', { questionsId: questionId});
      return  res.status(200).json({ message: 'Question deleted successfully' });
    }
    
   
  } catch (error) {
    console.error('Error deleting question:', error);
   return  res.status(500).json({ error: 'Internal server error' });
  }
};
