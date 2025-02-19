

import ProgramApplication from "../model/programApplicationModel.js"
import Program from "../model/programModel.js"
import { errorHandler } from "../utilis/error.js"



export const submitProgramApplication = async (req,res,next) => {

    if(!req.user.id)
    {
        return next(errorHandler(401,"Login to subimt"))
    }

    const user = req.user.id

    const {ProjectExperiences,SkillsAndExpertise,Motivation,References,Resume,CoverLetter,AdditionalInformation,program} = req.body

    try
    {

        const newApplication = new ProgramApplication({
            ProjectExperiences,Motivation,References,Resume,CoverLetter,SkillsAndExpertise,
            program,user,AdditionalInformation
        })

        if(req.body.LinkedIn)
        {
            newApplication.LinkedIn = req.body.LinkedIn
        }

        if(req.body.PortfolioWebsite)
        {
            newApplication.PortfolioWebsite = req.body.PortfolioWebsite
        }

        await newApplication.save()

        res.status(200).json({success:true , newApplication})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProgramApplication = async (req,res,next) => {

    const {programApplicationId} = req.params

    try
    {
        const programApplication = await ProgramApplication.findById(programApplicationId)
                                                            .populate({path:"program"})
                                                            .populate({path:"user"})

        if(!programApplication)
        {
            return next(errorHandler(404,"Program Application not found"))
        }

        res.status(200).json({success:true , programApplication})

    }
    catch(error)
    {
        next(error)
    }

}


export const getProgramApplications = async (req,res,next) => {

    try
    {

        const programApplications = await ProgramApplication.find({})
                                                            .populate({path:"user"})
                                                            .sort({_id:-1})

        res.status(200).json({success:true , programApplications})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateProgramApplication = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler("your are not allowed to update program application"))
    }

    const {programApplicationId} = req.params

    const programApplication = await ProgramApplication.findById(programApplicationId)

    if(!programApplication)
    {
        return next(errorHandler(404,"program application not found"))
    }

    try
    {

        const updatedProgramApplication = await ProgramApplication.findByIdAndUpdate(programApplicationId,
            {
                $set: {
                    References:req.body.References,
                    ProjectExperiences:req.body.ProjectExperiences,
                    AdditionalInformation:req.body.AdditionalInformation,
                    Resume:req.body.Resume,
                    CoverLetter:req.body.CoverLetter,
                    SkillsAndExpertise:req.body.SkillsAndExpertise,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedProgramApplication})
    }
    catch(error)
    {
        next(error)
    }

}


export const deleteProgramApplication = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler("your are not allowed to delete program application"))
    }

    const {programApplicationId} = req.params

    const programApplication = await ProgramApplication.findById(programApplicationId)

    if(!programApplication)
    {
        return next(errorHandler(404,"program application not found"))
    }

    try
    {
        await ProgramApplication.findByIdAndDelete(programApplicationId)

        res.status(200).json({success:true , message:"program deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const reviewProgramApplication = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"Your are not allowed to reveiw the Program Application"))
    }

    const {status} = req.body

    const {programApplicationId} = req.params

    const programApplication = await ProgramApplication.findById(programApplicationId)

    if(!programApplication)
    {
        return next(errorHandler(403 ,"programApplication not found"))
    }

    try
    {

        programApplication.status = status

        await programApplication.save()

        const programId = programApplication.program

        const program = await Program.findById(programId)

        if(!program)
        {
            return next(404,"program not found")
        }

        if(status === 'Accepted')
        {
            
            if(!program.enrolled.includes(programApplication.user))
            {
                program.enrolled.push(programApplication.user)
            }

        }

        res.status(200).json({success:true , message:'program reveiwed successfully'})


    }
    catch(error)
    {
        next(error)
    }

}


export const sendMessageToEnrolled = async (req,res,next) => {

    try{}
    catch(error)
    {
        next(error)
    }
}