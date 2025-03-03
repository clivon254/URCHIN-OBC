
import Talent from "../model/talentModel.js"
import { errorHandler } from "../utilis/error.js"



export const submitTalent = async (req,res,next) => {
    
    if(!req.user.id)
    {
        return next(errorHandler(401, "You are allowed to submit Talent"))
    }

    const {generalInfo,skillExpertise,performanceAndAchievements,workPrefrences,networkCollaboration} = req.body

    try
    {

        const newTalent = new Talent({
            generalInfo,skillExpertise,performanceAndAchievements,workPrefrences,networkCollaboration
        })

        await newTalent.save()

        res.status(200).json({success:true , newTalent})

    }
    catch(error)
    {
        next(error)
    }

}


export const getTalent = async (req,res,next) => {

    const {talentId} = req.body

    try
    {
        const talent = await Talent.findById(talentId)

        if(!talent)
        {
            return next(errorHandler(404 ,"talent not found "))
        }

        res.status(200).json({success:true , talent})

    }
    catch(error)
    {
        next(error)
    }

}


export const getTalents = async (req,res,next) => {

    try
    {
        const talents = await Talent.findById().sort({_id:-1})

        res.status(200).json({success:true , talents})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateTalent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 , "you are not allowed update talent"))
    }


    const {talentId} = req.params 


    const talent = await Talent.findById(talentId)


    if(!talent)
    {
        return next(errorHandler(404 , "talent not found"))
    }

    try
    {

        const updatedTalent = await Talent.findByIdAndUpdate(talentId , {
            $set:{
                status:req.body.status
            }
        }, {new:true})

        res.status(200).json({success:true , updatedTalent})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteTalent = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 , "you are not allowed update talent"))
    }


    const {talentId} = req.params 

    const talent = await Talent.findById(talentId)

    if(!talent)
    {
        return next(errorHandler(404 , "talent not found"))
    }

    try
    {

        await Talent.findByIdAndDelete(talentId)

        res.status(200).json({success:true , message:"Talent deleted successfully"})
        
    }
    catch(error)
    {
        next(error)
    }

}