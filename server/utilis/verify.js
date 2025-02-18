
import jwt from "jsonwebtoken"
import { errorHandler } from "./error.js"


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
