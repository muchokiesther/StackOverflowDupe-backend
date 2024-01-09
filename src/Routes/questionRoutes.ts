import { Router } from "express";
import { addQuestion, deleteQuestion, getQuestion, getQuestionByUserid, getQuestions, updateQuestion } from "../controllers/questionsController";
import { verifyToken } from "../Middlewares/creationtoken";
const questionRoutes = Router()

questionRoutes.post('',verifyToken,addQuestion)
questionRoutes.get('',verifyToken, getQuestions)
 questionRoutes.get('/:questionId',verifyToken,getQuestion)
questionRoutes.get('/user/question',verifyToken,getQuestionByUserid)
questionRoutes.put('/:questionId',verifyToken,updateQuestion)
questionRoutes.delete('/:questionId',verifyToken, deleteQuestion)

export default questionRoutes