

import express from "express"
import { bookTicket, deleteTicket, getTicket, getTickets, scanTicket, updateTicket } from "../controller/ticketController.js"
import { verifyToken } from "../utilis/verify.js"



const ticketRouter = express.Router()



ticketRouter.post('/book-ticket', bookTicket)


ticketRouter.post('/scan-ticket', scanTicket)


ticketRouter.get('/get-ticket/:ticketId', getTicket)


ticketRouter.get('/get-tickets' ,verifyToken , getTickets)


ticketRouter.put('/update-ticket/:ticketId', verifyToken , updateTicket)


ticketRouter.put('/delete-ticket/:ticketId', verifyToken , deleteTicket)





export default ticketRouter