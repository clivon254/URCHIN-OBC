

import express from "express"
import { createInternship, deleteInternship, getInternship, getsInternship, updateInternship } from "../controller/intershipController.js"
import { verifyToken } from "../utilis/verify.js"


const intershipRouter = express.Router()


intershipRouter.post('/create-internship', verifyToken , createInternship)


intershipRouter.get('/get-intership/:intershipId', getInternship)


intershipRouter.get('/get-internships', getsInternship)



intershipRouter.put('/update-internship/:intershipId',verifyToken , updateInternship)


intershipRouter.delete('/delete-intership/:intership', verifyToken ,deleteInternship)


export default intershipRouter