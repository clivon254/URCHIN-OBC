

import Program from "../model/programModel.js"
import { errorHandler } from "../utilis/error.js"




export const createProgram = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to create a program"))
    }

    const {title,description,category,startDate,endDate,location,applicationDeadline,eligibility,programFee} = req.body


    try
    {

        const newProgram = new Program({
            title,description,category,startDate,endDate,location,applicationDeadline,eligibility,programFee
        })

        if(req.body.instructors)
        {
            newProgram.instructors = req.body.instructors
        }

        if(req.body.capacity)
        {
            newProgram.capacity = req.body.capacity
        }

        await newProgram.save()

        res.status(200).json({success:true , newProgram})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProgram = async (req,res,next) => {

    const {programId} = req.params

    try
    {
        const program = await Program.findById(programId)

        if(!program)
        {
            return next(errorHandler(404 ,"Program not found"))
        }

        res.status(200).json({success:true , program})

    }
    catch(error)
    {
        next(error)
    }

}


export const getPrograms = async (req,res,next) => {

    try
    {

        const programs = await Program.find({}).sort({_id:-1})

        res.status(200).json({success:true , programs})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateProgram = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update program"))
    }

    const {programId} = req.params

    const program = await Program.findById(programId)

    if(!program)
    {
        return next(errorHandler(404,"program not found"))
    }

    try
    {

        const updatedProgram = await Program.findByIdAndUpdate(programId,
            {
                $set:{
                    title:req.body.title,
                    category:req.body.category,
                    description:req.body.description,
                    startDate:req.body.startDate,
                    endDate:req.body.endDate,
                    eligibility:req.body.eligibility,
                    applicationDeadline:req.body.applicationDeadline,
                    location:req.body.location,
                    programFee:req.body.programFee,
                    instructors:req.body.instructors,
                    capacity:req.body.capacity,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedProgram})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProgram = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to delete program"))
    }

    const {programId} = req.params

    const program = await Program.findById(programId)

    if(!program)
    {
        return next(errorHandler(404,"program not found"))
    }

    try
    {
        await Program.findByIdAndDelete(programId)

        res.status(200).json({success:true ,message:`${program.title} is deleted successfully`})
        
    }
    catch(error)
    {
        next(error)
    }

}