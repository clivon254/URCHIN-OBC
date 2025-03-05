
import Donation from "../model/donationModel.js"
import { errorHandler } from "../utilis/error.js"
import axios from "axios"



let clients = []


export const events = (req,res) => {

    res.setHeader('Content-Type', 'text/event-stream')

    res.setHeader('Cache-Control', 'no-cache')

    res.setHeader('Connection', 'keep-alive')

    // Add the client to the list
    clients.push(res)

    // remove the client the connection is closed
    req.on('closed',() => {

        clients = clients.filter(client => client !== res)

    })

}


// send updates to connected clients
const sendEventsToClients = (data) => {

    clients.forEach(client => {

        client.write(`data : ${JSON.stringify(data)}\n\n`)

    })

}



export const mpesaDonation = async (req,res,next) => {

    const {amount,type,category,personalInfo,billingAddress,paymentmethod} = req.body

    const token = req.token

    const phone  = personalInfo.phone.substring(1)

    try
    {
        const donation = new Donation({
            type,category,personalInfo,billingAddress,paymentmethod
        })

        await donation.save()

        const date = new Date()

        const timestamp = 
            date.getFullYear() + 
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2)
        
            const shortcode = process.env.PAYBILL

            const passkey = process.env.PASS_KEY

            const password = new Buffer.from(shortcode + passkey + timestamp).toString("base64")

            const url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"

            const requestBody = {    
                "BusinessShortCode": shortcode,    
                "Password": password,    
                "Timestamp":timestamp,    
                "TransactionType": "CustomerPayBillOnline",    
                "Amount": amount,    
                "PartyA":`254${phone}`,    
                "PartyB":shortcode,    
                "PhoneNumber":`254${phone}`,    
                "CallBackURL": `https://d7b8-41-90-172-184.ngrok-free.app/api/donation/callback?donationId=${donation._id}`,    
                "AccountReference":"URCHIN'OBC Donation",    
                "TransactionDesc":"Test"
             }

            await axios.post(  
                url,
                requestBody,
                {
                    headers:{
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            .then((response) => {

                let resData = response.data 

                res.status(200).json({success:true , resData , donation})
            })
            .catch((err) => {

                console.log("stk push error")

                res.status(400).json({success:false , message:`${err.message}`})
            })
            

    }
    catch(error)
    {
        next(error)
    }

}



export const callbackDonation = async (req,res,next) => {

    const {donationId} = req.query

    try
    {
        console.log("callback is working")

        const callbackData = req.body 

        if(!callbackData.Body.stkCallback.CallbackMetadata)
        {
            console.log(callbackData.Body)

            // send notification that the stk push has been attended
            sendEventsToClients({success:true , message:'STK Push has been attended to '})

            res.json("ok")

        }
        else
        {
            const body = req.body.Body.stkCallback.CallbackMetadata

            console.log(body)

            const donation = await Donation.findById(donationId)

            if(!donation)
            {
                return next(errorHandler(404 ,"Donation not found"))
            }
            else
            {

                await Donation.findByIdAndUpdate(donationId ,{payment:true})

                console.log("donation updated")        

            }

            // send notification that the stk push has been attended
            sendEventsToClients({success:true , message:'STK Push has been attended to '})

            res.status(200).json({success:true})

        }

    }
    catch(error)
    {
        next(error)
    }

}


export const confirmDonation = async (req,res,next) => {

    const {donationId} = req.params

    const token = req.token

    try
    {
        const auth = "Bearer " + token

        const url = "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query"

        const date = new Date()

        const timestamp = 
            date.getFullYear() + 
            ("0" + (date.getMonth() + 1)).slice(-2) +
            ("0" + date.getDate()).slice(-2) +
            ("0" + date.getHours()).slice(-2) +
            ("0" + date.getMinutes()).slice(-2) +
            ("0" + date.getSeconds()).slice(-2) 

        const shortcode = process.env.PAYBILL

        const passKey = process.env.PASS_KEY

        const password = new Buffer.from(shortcode + passKey + timestamp).toString("base64")

        const requestBody = {    
            "BusinessShortCode":shortcode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "CheckoutRequestID": req.params.CheckoutRequestID 
        }

        const response = await axios.post(url , requestBody , {headers:{"Authorization":auth}})

        if(response.data.ResultCode === "0")
        {

            const donation = await Donation.findById(donationId)

            if(!donation)
            {
                return next(errorHandler(404 ,"Donation not found"))
            }
            else
            {

                await Donation.findByIdAndUpdate(donationId ,{payment:true})

                console.log("donation updated")        

            }

        }
        else
        {
            await Donation.findByIdAndDelete(donationId)

            res.status(200).json({success:true , data:response.data , message:`${response.data.ResultDesc}` })

        }

    }
    catch(error)
    {
        next(error)

        console.log(error.message)
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