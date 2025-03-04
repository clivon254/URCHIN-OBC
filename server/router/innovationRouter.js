

import express from "express"
import { deletesubmitInnovation, getsubmitInnovation, getsubmitInnovations, submitInnovation, updatesubmitInnovation } from "../controller/innovationController.js"
import { verifyToken } from "../utilis/verify.js"



const innovationRouter = express.Router()




innovationRouter.post('/submit-talent' , verifyToken, submitInnovation)


innovationRouter.get('/get-talent/:talentId', getsubmitInnovation)


innovationRouter.get('/get-talents', getsubmitInnovations)


innovationRouter.put('/update-talent/:talentId', updatesubmitInnovation)


innovationRouter.delete('/delete-talent/:talentId', deletesubmitInnovation)





export default innovationRouter