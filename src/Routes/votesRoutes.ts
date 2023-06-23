import { Router } from "express";
import { downVote, upVote } from "../controllers/votesController";
import { verifyToken } from "../Middlewares/creationtoken";

const votesRoutes = Router()
votesRoutes.post('/upvote/:answerId',verifyToken,upVote)

votesRoutes.post('/downvote/:answerId',verifyToken,downVote)

export default  votesRoutes