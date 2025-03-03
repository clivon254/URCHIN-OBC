
import Innovation from "../model/innovationModel.js"
import { errorHandler } from "../utilis/error.js"



export const submitInnovation = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(401, "You are allowed to submit Innovation"))
    }

    const {
        technologyResearchTrends,intellectualProperty,fundingInvestData,marketIndustryInsights,prototypingData,collaborations,operationalBusinessData
    } = req.body

    try
    {

        const newInnovation = new Innovation({
            technologyResearchTrends,intellectualProperty,fundingInvestData,marketIndustryInsights,prototypingData,collaborations,operationalBusinessData
        })

        await newInnovation.save()

        res.status(200).json({success:true , newInnovation})
    
        }
        catch(error)
        {
            next(error)
        }

}


export const getsubmitInnovation = async (req,res,next) => {

    const {innovationId} = req.body

    try
    {
        const innovation = await Innovation.findById(innovationId)

        if(!innovation)
        {
            return next(errorHandler(404 ,"innovation not found"))
        }

        res.status(200).json({success:true , innovation})

    }
    catch(error)
    {
        next(error)
    }

}


export const getsubmitInnovations = async (req,res,next) => {

    try
    {
        const innovations = await Innovation.findById().sort({_id:-1})

        res.status(200).json({success:true , innovations})

    }
    catch(error)
    {
        next(error)
    }

}


export const updatesubmitInnovation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 , "you are not allowed update innovation"))
    }


    const {innovationId} = req.params 


    const innovation = await Innovation.findById(innovationId)


    if(!innovation)
    {
        return next(errorHandler(404 , "innovation not found"))
    }

    try
    {

        const updatedInnovation = await Innovation.findByIdAndUpdate(innovationId , {
            $set:{
                status:req.body.status
            }
        }, {new:true})

        res.status(200).json({success:true , updatedInnovation})

    }
    catch(error)
    {
        next(error)
    }

}


export const deletesubmitInnovation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 , "you are not allowed update Innovation"))
    }


    const {innovationId} = req.params 

    const innovation = await Innovation.findById(innovationId)

    if(!innovation)
    {
        return next(errorHandler(404 , "innovation not found"))
    }

    try
    {

        await Innovation.findByIdAndDelete(innovationId)

        res.status(200).json({success:true , message:"Innovation deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}