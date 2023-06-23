import { Router } from "express";
import { addAnswer, getAnswerForUserQuestion, getAnswersForQuestion, setPreferred } from "../controllers/answersController";
import { getQuestion } from "../controllers/questionsController";
import { verifyToken } from "../Middlewares/creationtoken";
const answerRoutes = Router()
answerRoutes.post('/:questionId',verifyToken, addAnswer)
answerRoutes.post('/prefer/:answerId',verifyToken,setPreferred)
answerRoutes.get('/:questionId',verifyToken,getAnswersForQuestion )
answerRoutes.get('/useranswer/:userId',verifyToken,getAnswerForUserQuestion)
export default answerRoutes