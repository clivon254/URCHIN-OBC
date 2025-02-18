
import jwt from "jsonwebtoken"
import { errorahandler } from "./error.js"


export const verifyToken = (req,res,next) => {

    const {token} = req.cookies

    if(!token)
    {
        return next(errorahandler(401,"Unauthorized ,no token in the cookies"))
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
