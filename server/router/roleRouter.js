

import express from "express"
import { verifyToken } from "../utilis/verify.js"
import { addRole, deleteRole, getRole, getRoles, updateRole } from "../controller/roleController.js"


const roleRouter = express.Router()


roleRouter.post('/add-role', verifyToken , addRole)


roleRouter.get('/get-role/:roleId' , getRole)


roleRouter.get('/get-roles', getRoles)


roleRouter.put('/update-role/:roleId', verifyToken, updateRole)


roleRouter.delete('/delete-role/:roleId',verifyToken , deleteRole)



export default roleRouter