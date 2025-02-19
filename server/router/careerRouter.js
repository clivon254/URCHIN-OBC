

import express from "express"
import { createCareer, deleteCareer, getCareer, getCareers, updateCareer } from "../controller/careerContoroller.js"
import { verifyToken } from "../utilis/verify.js"


const careerRouter  = express.Router()


careerRouter.post('/create-career', verifyToken , createCareer)

careerRouter.get('/get-career/:careerId', getCareer)

careerRouter.get('/get-careers' ,getCareers)

careerRouter.put('/update-career/:careerId' , updateCareer)

careerRouter.delete('/delete-career/:careerId' , verifyToken , deleteCareer)


export default careerRouter