import { Router } from "express";
import { addQuestion } from "../controllers/questionscontroller";
const questionRoutes = Router()

questionRoutes.post('/:userId',addQuestion)


export default questionRoutes