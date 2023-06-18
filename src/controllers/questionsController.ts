import { Request, Response } from 'express';
import { v4 as uid } from 'uuid';
import { DatabaseHelper } from '../DatabaseHelpers';
import { DecodedData, questionsExtendedRequest } from '../interfaces';

export const addQuestion = async (req: questionsExtendedRequest, res: Response) => {
    try {
      const { title, body } = req.body;
      const { userId } = req.params;
      const questionId = uid();
      await DatabaseHelper.exec('addQuestion', { questionsId: questionId, userId, title, body });
      res.status(201).json({ message: 'Question added successfully' });
    } catch (error) {
      console.error('Error adding question:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

export const getQuestions = async (req: Request, res: Response) => {
  try {
    const result = await DatabaseHelper.query('SELECT * FROM QUESTIONS WHERE isDeleted = 0');
    const questions = result.recordset;
    res.status(200).json(questions);
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// export const getQuestion = async (req: Request, res: Response) => {
//     try {
//       const { questionId } = req.params;
//       const result = await DatabaseHelper.query(
//         'SELECT * FROM QUESTIONS WHERE questionId = @questionId AND isDeleted = 0',
//         { '@questionId': questionId } // Provide the parameter as an object with the appropriate key
//       );
//       const question = result.recordset[0];
//       if (!question) {
//         res.status(404).json({ error: 'Question not found' });
//       } else {
//         res.status(200).json(question);
//       }
//     } catch (error) {
//       console.error('Error retrieving question:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
  

// export const updateQuestion = async (req: questionsExtendedRequest, res: Response) => {
//   try {
//     const { questionId } = req.params;
//     const { userId, title, body } = req.body;
//     await DatabaseHelper.exec('updateQuestions', { questionsId: questionId, userId, title, body });
//     res.status(200).json({ message: 'Question updated successfully' });
//   } catch (error) {
//     console.error('Error updating question:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// export const deleteQuestion = async (req: Request, res: Response) => {
//   try {
//     const { questionId } = req.params;
//     await DatabaseHelper.exec('deleteQuestion', { questionsId: questionId });
//     res.status(200).json({ message: 'Question deleted successfully' });
//   } catch (error) {
//     console.error('Error deleting question:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
