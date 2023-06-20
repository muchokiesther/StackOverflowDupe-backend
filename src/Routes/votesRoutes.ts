import { Router } from "express";
import { downVote, upVote } from "../controllers/votesController";
import { verifyToken } from "../Middlewares/creationtoken";

const votesRoutes = Router()
votesRoutes.post('/upvote/:userId/:answerId',verifyToken,upVote)

votesRoutes.post('/downvote/:userId/:answerId',verifyToken,downVote)

export default  votesRoutes