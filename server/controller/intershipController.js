
import Intership from "../model/intershipModel.js"
import { errorHandler } from "../utilis/error.js"


export const createInternship = async (req,res,next) => {

    if(!req.use.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed create an Internship"))
    }

    const {title,description,company,location,startDate,responsibilities,qualifications,deadline,intershipType} = req.body

    try
    {

        const newInternship = new Intership({
            title,description,company,location,startDate,responsibilities,qualifications,deadline,intershipType
        })

        await newInternship.save()

        res.status(200).json({success:true , newInternship})

    }
    catch(error)
    {
        next(error)
    }

}


export const getInternship = async (req,res,next) => {

    const {internshipId} = req.params

    try
    {
        const intership = await Intership.findById(internshipId)

        if(!internship)
        {
            return next(errorHandler(404,"Internship not found"))
        }

        res.status(200).json({success:true , intership})
    }
    catch(error)
    {
        next(error)
    }

}


export const getsInternship = async (req,res,next) => {

    try
    {
        const internships = await Intership.find({}).sort({_id:-1})

        res.status(200).json({success:true , internships})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateInternship = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400 , "You are not allowed to update Intership"))
    }

    const {internshipId} = req.params

    const internship = await Intership.findById(internshipId)

    if(!internship)
    {
        return next(errorHandler(404 , "Intership not found"))
    }

    try
    {

        const updatedIntership = await Intership.findByIdAndUpdate(internshipId,
            {
                $set:{
                    title:req.body.title ,
                    description:req.body.description ,
                    location:req.body.location ,
                    startDate:req.body.startDate ,
                    duration:req.body.duration ,
                    responsiblities:req.body.responsiblities ,
                    qualification:req.body.qualification ,
                    deadline:req.body.deadline ,
                    intershipType:req.body.intershipType 
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedIntership})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteInternship = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(400 , "You are not allowed to delete Intership"))
    }

    const {internshipId} = req.params

    const internship = await Intership.findById(internshipId)

    if(!internship)
    {
        return next(errorHandler(404 , "Intership not found"))
    }

    try
    {
        await Intership.findByIdAndDelete(internshipId)

        res.status(200).json({success:true , message:`${internship.title} is deleted successfully`})
    }
    catch(error)
    {
        next(error)
    }

}