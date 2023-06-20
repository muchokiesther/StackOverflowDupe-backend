import { Router } from "express";
import { addComment } from "../controllers/commentsController";
const commentsRoutes = Router()

commentsRoutes.post('/:userId/:answerId',addComment)
commentsRoutes.get('')

export default  commentsRoutes