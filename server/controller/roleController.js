
import Role from "../model/roleModel.js"
import { errorHandler } from "../utilis/error.js"



export const addRole = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, "You are not allowed to add roles"))
    }

    const {name} = req.body

    try
    {
        const newRole = new Role({
            name
        })

        await newRole.save()

        res.status(200).json({success:true , newRole})

    }
    catch(error)
    {
        next(error)
    }

}

export const getRole = async (req,res,next) => {

    const {roleId} = req.params

    try
    {
        const role = await Role.findById(roleId)

        if(!role)
        {
            return next(errorHandler(404,"Role not found"))
        }

        res.status(200).json({success:true , role})

    }
    catch(error)
    {
        next(error)
    }

}

export const getRoles = async (req,res,next) => {

    try
    {

        const roles = await Role.find({}).sort({_id:-1})

        res.status(200).json({success:true , roles})

    }
    catch(error)
    {
        next(error)
    }

}

export const updateRole = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"you are not allowed to updated the role"))
    }

    const {roleId} = req.params

    const role = await Role.findById(roleId)

    if(!role)
    {
        return next(errorHandler(404,"role not found"))
    }

    try
    {

        const updatedRole = await Role.findByIdAndUpdate(roleId,
            {
                $set:{
                    name:req.body.name
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedRole})

    }
    catch(error)
    {
        next(error)
    }

}

export const deleteRole = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401,"you are not allowed to delete the role"))
    }

    const {roleId} = req.params

    const role = await Role.findById(roleId)

    if(!role)
    {
        return next(errorHandler(404,"role not found"))
    }

    try
    {
        await Role.findByIdAndDelete(roleId)

        res.status(200).json({success:true , message:`${role.name} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}