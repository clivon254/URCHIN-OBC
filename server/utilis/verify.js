
import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"
import axios from "axios"



export const verifyToken = (req,res,next) => {

    const token = req.cookies.access_token

    if(!token)
    {
        return next(errorHandler(401,"Unauthorized ,no token in the cookies"))
    }

    jwt.verify(token , process.env.JWT_SECRETE ,(err,user) => {

        if(err)
        {
            return next(errorahandler(401 , "Token do not match or the token expired"))
        }

        req.user = user

        next()

    })

}


export const generateRandomNumber = () => {

    const letters = "ABCDEFGHIJLMNOPQRSTUVWXWZ"

    const randomLetter = letters[Math.floor(Math.random() * letters.length)]

    const randomNumbers = Math.floor(Math.random() * 9000) + 1000

    return `${randomLetter}${randomNumbers}`
    
}


export const generateAccessToken = async (req,res,next) => {

    const consumerKey = process.env.CONSUMER_KEY

    const consumerSecrete = process.env.CONSUMER_SECRETE

    const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"

    const auth = new Buffer.from(consumerKey + ":" + consumerSecrete).toString("base64")

    const headers = {
        "Authorization":"Basic" + " " + auth,
        "Content-Type":"application/json",
    }

    await axios.get(url,{headers})
    .then((response) => {

        req.token = response.data.access_token

        next()

    })
    .catch((err) => {

        console.log(err.message)

        console.log("mpesa token is the issue bro")

    })

}