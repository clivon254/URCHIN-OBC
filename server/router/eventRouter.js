

import express from "express"
import { addEvent, deleteEvent, getEvent, getEvents, updateEvent } from "../controller/eventContoller.js"
import { verifyToken } from "../utilis/verify.js"


const eventRouter = express.Router()


eventRouter.post('/add-event', verifyToken, addEvent)


eventRouter.get('/get-event/:eventId', getEvent)


eventRouter.get('/get-events', getEvents)


eventRouter.put('/update-event/:eventId', verifyToken, updateEvent)


eventRouter.put('/delete-event/:eventId', verifyToken, deleteEvent)



export default eventRouter 