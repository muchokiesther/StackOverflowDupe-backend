import { Router } from "express";
import { downVote, upVote } from "../controllers/votesController";

const votesRoutes = Router()
votesRoutes.post('/upvote/:userId/:answerId',upVote)

votesRoutes.post('/downvote/:userId/:answerId',downVote)
export default  votesRoutes