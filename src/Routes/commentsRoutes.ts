import { Router } from "express";
import { addComment, getComments } from "../controllers/commentsController";
import { verifyToken } from "../Middlewares/creationtoken";
const commentsRoutes = Router()

commentsRoutes.post('/:userId/:questionsId/:answerid',verifyToken,addComment)
commentsRoutes.get('/:answerid',verifyToken,getComments)

export default  commentsRoutes