import { Router } from "express";
import { addAnswer, getAnswerForUserQuestion, getAnswersForQuestion, setPreferred } from "../controllers/answersController";
import { getQuestion } from "../controllers/questionsController";
const answerRoutes = Router()
answerRoutes.post('/:userId/:questionId',addAnswer)
answerRoutes.post('/:answerId',setPreferred)
answerRoutes.get('/:questionId',getAnswersForQuestion )
answerRoutes.get('/:userId',getAnswerForUserQuestion)
export default answerRoutes