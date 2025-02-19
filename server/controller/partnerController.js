
import Partner from "../model/partnerModel.js"
import { errorHandler } from "../utilis/error.js"



export const addPartner = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to a partner"))
    }

    const {name,image} = req.body

    try
    {

        const newPartner = new Partner({
            name,image
        })

        await newPartner.save()

        res.status(200).json({success:true , newPartner})

    }
    catch(error)
    {
        next(error)
    }

}

export const getPartner = async (req,res,next) => {

    const {partnerId} = req.params

    try
    {
        const partner = await Partner.findById(partnerId)

        if(!partner)
        {
            return next(errorHandler(404 , "No partner found"))
        }

        res.status(200).json({success:true , partner})

    }
    catch(error)
    {
        next(error)
    }

}

export const getPartners = async (req,res,next) => {

    try
    {

        const partners = await Partner.find().sort({_id:-1})

        res.status(200).json({success:true , partners})

    }
    catch(error)
    {
        next(error)
    }

}

export const updatePartner = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to update a partner"))
    }

    const {partnerId} = req.params

    const partner = await Partner.findById(partnerId)

    if(!partner)
    {
        return next(errorHandler(404, "partner not found"))
    }

    try
    {

        const updatedPartner = await Partner.findByIdAndUpdate(partnerId,
            {
                $set:{
                    name:req.body.name,
                    image:req.body.image
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedPartner})

    }
    catch(error)
    {
        next(error)
    }

}

export const deletePartner = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to delete a partner"))
    }

    const {partnerId} = req.params

    const partner = await Partner.findById(partnerId)

    if(!partner)
    {
        return next(errorHandler(404, "partner not found"))
    }
    
    try
    {
        await Partner.findByIdAndDelete(partnerId)

        res.status(200).json({success:true , message:`${partner.name} is deleted successfully`})
        
    }
    catch(error)
    {
        next(error)
    }

}