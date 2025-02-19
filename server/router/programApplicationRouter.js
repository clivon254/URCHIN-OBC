

import express from "express"
import { verifyToken } from "../utilis/verify.js"
import { deleteProgramApplication, getProgramApplication, getProgramApplications, reviewProgramApplication, submitProgramApplication, updateProgramApplication } from "../controller/programApplicationController.js"


const programApplicationRouter = express.Router()


programApplicationRouter.post('/submit-application' , verifyToken , submitProgramApplication)

programApplicationRouter.get('/get-programApplication/:programApplicationId', getProgramApplication)

programApplicationRouter.get('/get-programApplications', getProgramApplications)

programApplicationRouter.put('/update-programApplication/:programApplicationId', verifyToken , updateProgramApplication)

programApplicationRouter.put('/reveiw-programApplication/:programApplicationId',verifyToken , reviewProgramApplication)

programApplicationRouter.delete('/delete-programApplication/:programApplicationId', verifyToken , deleteProgramApplication)


export default programApplicationRouter