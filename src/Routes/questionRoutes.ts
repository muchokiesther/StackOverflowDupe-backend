import { Router } from "express";
import { addQuestion, deleteQuestion, getQuestion, getQuestionByUserid, getQuestions, updateQuestion } from "../controllers/questionsController";
const questionRoutes = Router()

questionRoutes.post('/:userId',addQuestion)
questionRoutes.get('', getQuestions)
 questionRoutes.get('/:questionsId',getQuestion)
questionRoutes.get('/user/:userId',getQuestionByUserid)
questionRoutes.put('/:userId/:questionId',updateQuestion)
questionRoutes.delete('/:userId/:questionId',deleteQuestion)

export default questionRoutes