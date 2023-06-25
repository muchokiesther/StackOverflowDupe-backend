import { Router } from "express";
import { addUser, deleteUser, getAllUsers, getUsersByEmail, getUsersById, loginUser, updateUser } from "../controllers/userController";
import { verifyToken } from "../Middlewares/creationtoken";

const userRoutes = Router()

userRoutes.post('', addUser)
userRoutes.get('',getAllUsers)
userRoutes.get('/email/:email',verifyToken,getUsersByEmail)
userRoutes.get('/:userId',verifyToken,getUsersById)

userRoutes.put('/:userId',verifyToken,updateUser)
userRoutes.delete('/:userId',verifyToken, deleteUser)
userRoutes.post('/login', loginUser)



export default userRoutes