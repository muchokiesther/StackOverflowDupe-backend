import { Router } from "express";
import { addComment, getComments } from "../controllers/commentsController";
const commentsRoutes = Router()

commentsRoutes.post('/:userId/:questionsId/:answerid',addComment)
commentsRoutes.get('/:answerid',getComments)

export default  commentsRoutes