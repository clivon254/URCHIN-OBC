

import express from "express"
import { addPartner, deletePartner, getPartner, getPartners, updatePartner } from "../controller/partnerController.js"
import { verifyToken } from "../utilis/verify.js"


const partnerRouter = express.Router()


partnerRouter.post('/add-partner',verifyToken ,addPartner)

partnerRouter.get('/get-partner/:partnerId', getPartner)

partnerRouter.get('/get-partners', getPartners)

partnerRouter.put('/update-partner/:partnerId', verifyToken, updatePartner)

partnerRouter.delete('/delete-partner/:partnerId', verifyToken , deletePartner)
 

export default partnerRouter