import { Router } from "express";
import { getAllTags } from "../controllers/tagsController";
import { verifyToken } from "../Middlewares/creationtoken";


const tagRoutes = Router()

tagRoutes.get('',verifyToken,getAllTags)

export default  tagRoutes