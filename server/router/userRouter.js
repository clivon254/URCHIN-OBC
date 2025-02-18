

import express from "express"
import { deleteUser, getUser, getUsers } from "../controller/userController.js"
import { verifyToken } from "../utilis/verify.js"



const userRouter = express.Router()


userRouter.get('/get-user/:userId', getUser)


userRouter.get('/get-users',verifyToken ,getUsers)


userRouter.put('/update-user/:userId',verifyToken, getUser)


userRouter.delete('/delete-user/:userId',verifyToken, deleteUser)





export default userRouter