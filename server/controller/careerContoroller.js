
import Career from "../model/careerModel.js"
import { errorHandler } from "../utilis/error.js"



export const createCareer = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create career"))
    }

    const {title,description,company,location,jobType,responsibilities,qualifications,deadline} = req.body

    try
    {

        const newCareer = new Career({
            title,description,company,location,jobType,responsibilities,qualifications,deadline
        })

        await newCareer.save()

        res.status(200).json({success:true , newCareer})

    }
    catch(error)
    {
        next(error)
    }
}

export const getCareer = async (req,res,next) => {

    const {careerId} = req.params

    try
    {
        const career = await Career.findById(careerId)

        if(!career)
        {
            return next(errorHandler(404 ,"career not found"))
        }

        res.status(200).json({success:true , career})

    }
    catch(error)
    {
        next(error)
    }
}

export const getCareers = async (req,res,next) => {

    
    try
    {
        const careers = await Career.find().sort({_id:-1})

        res.status(200).json({success:true , careers})

    }
    catch(error)
    {
        next(error)
    }
}

export const updateCareer = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to update career"))
    }

    const {careerId} = req.params

    const career = await Career.findById(careerId)

    if(!career)
    {
        return next(errorHandler(404,"Career not found"))
    }
    
    try
    {

        const updatedCareer = await Career.findByIdAndUpdate(careerId,
            {
                $set:{
                    title:req.body.title,
                    description:req.body.description,
                    location:req.body.location,
                    jobType:req.body.jobType,
                    responsibilities:req.body.responsibilities,
                    qualifications:req.body.qualifications,
                    deadline:req.body.deadline
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedCareer})

    }
    catch(error)
    {
        next(error)
    }
}

export const deleteCareer = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"You are not allowed to update career"))
    }

    const {careerId} = req.params

    const career = await Career.findById(careerId)

    if(!career)
    {
        return next(errorHandler(404,"Career not found"))
    }

    try
    {
        await Career.findByIdAndDelete(careerId)

        res.status(200).json({success:true , message:`${career.title} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }
}

