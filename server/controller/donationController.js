
import Donation from "../model/donationModel.js"
import { errorHandler } from "../utilis/error.js"


export const mpesaDonation = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const callbackDonation = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const cardDonation = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const getDonation = async (req,res,next) => {

    const {donationId} = req.body

    try
    {
        const donation = await Donation.findById(donationId)

        if(!donation)
        {
            return next(errorHandler(404, "donation not found"))
        }

        res.status(200).json({success:true , donation})

    }
    catch(error)
    {
        next(error)
    }

}


export const getDonations = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403, "You are not allowed to see admin"))
    }

    try
    {
        const donations = await Donation.find().sort({_id:-1})

        res.status(200).json({success:true , donations})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateDonation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, "You are not allowed update the donation"))
    }

    const {donationId} = req.params

    const donation = await Donation.findById(donationId)

    if(!donation)
    {
        return next(errorHandler(404 ,"donation not found"))
    }

    try
    {
        const updatedDonation = await Donation.findByIdAndUpdate(donationId,
            {
                $set:{
                    type:req.body.type,
                    category:req.body.category,
                    payment:req.body.payment,
                    paymentmethod:req.body.paymentmethid,
                    personalInfo:req.body.personalInfo,
                    billingAddress:req.body.billingAddress,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedDonation})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteDonation = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(401, "You are not allowed delete the donation"))
    }

    const {donationId} = req.params

    const donation = await Donation.findById(donationId)

    if(!donation)
    {
        return next(errorHandler(404 ,"donation not found"))
    }

    try
    {
        await Donation.findByIdAndDelete(donationId)

        res.status(200).json({success:true , message:"donation deleted successfully"})

    }
    catch(error)
    {
        next(error)
    }

}