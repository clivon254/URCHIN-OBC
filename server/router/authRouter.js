

import express from "express"
import { ContactUs, ForgotPassword, ResetPassword, SignIn, SignUp } from "../controller/authController.js"


const authRouter = express.Router()




authRouter.post('/sign-in', SignIn)


authRouter.post('/sign-up', SignUp)


authRouter.post('/forgot-password', ForgotPassword)


authRouter.post('/reset-password/:token', ResetPassword)


authRouter.post('/contact-us', ContactUs)




export default authRouter