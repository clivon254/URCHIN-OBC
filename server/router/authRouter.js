

import express from "express"
import { ContactUs, ForgotPassword, ResetPassword, SignIn, SignOut, SignUp } from "../controller/authController.js"


const authRouter = express.Router()




authRouter.post('/sign-in', SignIn)


authRouter.post('/sign-up', SignUp)


authRouter.post('/sign-out', SignOut)


authRouter.post('/forgot-password', ForgotPassword)


authRouter.post('/reset-password/:token', ResetPassword)


authRouter.post('/contact-us', ContactUs)




export default authRouter