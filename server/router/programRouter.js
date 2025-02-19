

import express from "express"
import { verifyToken } from "../utilis/verify.js"
import { createProgram, deleteProgram, getProgram, getPrograms, updateProgram } from "../controller/programController.js"


const programRouter = express.Router()


programRouter.post('/create-program', verifyToken , createProgram)


programRouter.get('/get-program', getProgram)


programRouter.get('/get-programs', getPrograms)


programRouter.put('/update-program/:programId',verifyToken , updateProgram)


programRouter.delete('/delete-program/:programId' ,verifyToken , deleteProgram)



export default programRouter