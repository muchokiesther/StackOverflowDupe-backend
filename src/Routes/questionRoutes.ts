import { Router } from "express";
import { addQuestion, deleteQuestion, getQuestion, getQuestionByUserid, getQuestions, updateQuestion } from "../controllers/questionsController";
import { verifyToken } from "../Middlewares/creationtoken";
const questionRoutes = Router()

questionRoutes.post('/:userId',verifyToken,addQuestion)
questionRoutes.get('',verifyToken, getQuestions)
 questionRoutes.get('/:questionId',verifyToken,getQuestion)
questionRoutes.get('/user/:userId',verifyToken,getQuestionByUserid)
questionRoutes.put('/:userId/:questionId',verifyToken,updateQuestion)
questionRoutes.delete('/:userId/:questionId',verifyToken, deleteQuestion)

export default questionRoutes