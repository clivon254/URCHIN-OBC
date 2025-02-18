
import Service from "../model/serviceModel.js"
import { errorHandler } from "../utilis/error.js"



export const addService = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"you are not allowed to add services"))
    }

    const {image,title,description} = req.body

    try
    {

        const newService = new Service({
            title,description,image
        })

        await newService.save()

        res.status(200).json({success:true , newService})

    }
    catch(error)
    {
        next(error)
    }

}


export const getService = async (req,res,next) => {

    const {serviceId} = req.params

    const service = await Service.findById(serviceId)

    if(!service)
    {
        return next(errorHandler(404,"service not found"))
    }

    try
    {

        res.status(200).json({success:true , service})

    }
    catch(error)
    {
        next(error)
    }

}


export const getServices = async (req,res,next) => {

    try
    {
        const services = await Service.find().sort({_id:-1})

        res.status(200).json({success:true , services})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateService = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to updated this service"))
    }

    const {serviceId} = req.params

    const service = await Service.findById(serviceId)

    if(!service)
    {
        return next(errorHandler(404,"Service not found"))
    }

    try
    {

        const updatedService = await Service.findByIdAndUpdate(serviceId ,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    image:req.body.image
                }
            },
            {new :true}
        )

        res.status(200).json({success:true , updatedService})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteService = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to updated this service"))
    }

    const {serviceId} = req.params

    const service = await Service.findById(serviceId)

    if(!service)
    {
        return next(errorHandler(404,"Service not found"))
    }

    try
    {
        await Service.findByIdAndDelete(serviceId)

        res.status(200).json({success:true , message:`${service.title} deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}