

import express from "express"
import { deleteTalent, getTalent, getTalents, submitTalent, updateTalent } from "../controller/talentController.js"
import { verifyToken } from "../utilis/verify.js"




const talentRouter = express.Router()


talentRouter.post('/submit-talent' ,verifyToken , submitTalent)


talentRouter.get('/get-talent/:talentId', getTalent)


talentRouter.get('/get-talents', getTalents)


talentRouter.put('/update-talent/:talentId', updateTalent)


talentRouter.delete('/delete-talent/:talentId', deleteTalent)



export default talentRouter