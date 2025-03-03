
import Event from "../model/eventModel.js"
import { errorHandler } from "../utilis/error.js"


export const addEvent = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to add event"))
    }

    const {name,category,date,location,description,image,ticketTypes} = req.body 

    try
    {

        const availableTickets = ticketTypes.reduce(
            (total, type) => total + type.quantity,
            0
        )

        const event = new Event({
            name,category,date,location,description,image,ticketTypes,availableTickets
        })

        await event.save()

        res.status(200).json({success:true , event ,message:"Event created successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const getEvent = async (req,res,next) => {
    
    const {eventId} = req.params

    try
    {
        const event = await Event.findById(eventId)

        if(!event)
        {
            return next(errorHandler(404 , "Event not found"))
        }

        res.status(200).json({success:true ,event})

    }
    catch(error)
    {
        next(error)
    }

}


export const getEvents = async (req,res,next) => {

    try
    {

        const events = await Event.find().sort({_id:-1})

        res.status(200).json({success:true , events})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateEvent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed update event"))
    }

    const {eventId} = req.params

    const event = await Event.findById(eventId)

    if(!event)
    {
        return next(errorHandler(404,"Event not found"))
    }

    try
    {

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                $set:{
                    name:req.body.name,
                    image:req.body.image,
                    description:req.body.description,
                    date:req.body.date,
                    category:req.body.category,
                    location:req.body.location,
                    ticketTypes:req.body.ticketTypes
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedEvent})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteEvent = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed update event"))
    }

    const {eventId} = req.params

    const event = await Event.findById(eventId)

    if(!event)
    {
        return next(errorHandler(404,"Event not found"))
    }

    try
    {
        await Event.findByIdAndDelete(eventId)

        res.status(200).json({success:true , message:`${event.name} is deleted successfully `})
        
    }
    catch(error)
    {
        next(error)
    }

}