
import { errorHandler } from "../utilis/error.js"
import validator from "validator"
import bcryptjs from "bcryptjs"
import User from "../model/userModel.js"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"



export const SignUp =  async (req,res,next) => {

    try
    {

        const {email,password,username,phone,gender,skill,Nationality,DateOfBirth} = req.body

        if(
            !email || !password || !username || !phone || !gender || !skill || !Nationality || Nationality === "" || !DateOfBirth 
            || email === "" || password === "" || username === "" || phone === "" || gender === ""|| skill === "" || DateOfBirth === ""
        )
        {
            return next(errorHandler(400,"Please fill all the fields"))
        }


        if(!validator.isEmail(email))
        {
            return next(errorHandler(400,"Please provide a valid email address"))
        }

        const existingEmail = await User.findOne({email})

        if(existingEmail)
        {
            return next(errorHandler(400,"Email is already registeerd"))
        }

        const hashedPassword = bcryptjs.hashSync(password, 10)

        function calculateAge(dateOfBirth) {

            const birthDate = new Date(dateOfBirth); // Convert to Date object

            const currentDate = new Date();
          
            let age = currentDate.getFullYear() - birthDate.getFullYear();
          
            // Adjust age if birthday hasn't occurred yet this year
            if (
              currentDate.getMonth() < birthDate.getMonth() ||
              (currentDate.getMonth() === birthDate.getMonth() &&
                currentDate.getDate() < birthDate.getDate())
            ) {
              age--;
            }
          
            return age;
        }

        const age = calculateAge(DateOfBirth)

        const newUser = new User({
            email,username,phone,gender,skill,Nationality,DateOfBirth,
            password:hashedPassword,age
        })

        await newUser.save()

        res.status(200).json({success:true , message:"User created successfully"})

    }
    catch(error)
    {
        next(error)
    }

}


export const SignIn =  async (req,res,next) => {

    const {email,password} = req.body

    if(!email || !password || email === "" || password === "")
    {
        return next(errorHandler(400,"Please fill all the fields"))
    }

    if(!validator.isEmail(email))
    {
        return next(errorHandler(400 ,"please provide a valid email"))
    }

    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(400,"The email is not register"))
        }

        const isMatch = await bcryptjs.compare(password, user.password)

        if(!isMatch)
        {
            return next(errorHandler(401,"The password is incorrect"))
        }

        const token = jwt.sign(
            {
                id:user._id,
                isAdmin:user.isAdmin,
                role:user.role
            },
            process.env.JWT_SECRETE,
            {expiresIn:"12h"}
        )

        const {password:pass , ...rest} = user._doc

        
        res.status(200)
            .cookie('access_token', token ,{
                httpOnly: true,
                secure: true, // Required for HTTPS
                sameSite: 'none', // Critical for cross-domain cookies
                //domain: '.render.com', Optional - try with and without this
                // If using a custom domain, you might need to adjust this
                maxAge: 12 * 60 * 60 * 1000 // 12 hours in milliseconds
            })
            .json({success:true , rest})


    }
    catch(error)
    {
        next(error)
    }

}


export const ForgotPassword =  async (req,res,next) => {

    const {email} = req.body

    if(!email || email === "")
    {
        return next(errorHandler(400,"please provide an email"))
    }

    if(!validator.isEmail(email))
    {
        return next(errorHandler(400,"Invalid email"))
    }


    try
    {
        const user = await User.findOne({email})

        if(!user)
        {
            return next(errorHandler(404, "email provided is not signed up"))
        }
        
        const token = jwt.sign(
            {
                id:user._id
            },
            process.env.JWT_SECRETE,
            {expiresIn:'1h'}
        )

        var transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const url = ""

        var mailOptions = {
            from:"URCHIN'OBC",
            to:user.email,
            subject:"Reset Password",
            text:`Click on thos link to reset your password: http://localhost:5173/reset-password/${token}`
        }

        transporter.sendMail(mailOptions , (error, info) => {

            if(error)
            {
                console.log(error)
            }
            else
            {
                console.log('Email sent: ' + info.response)
            }

        })

        res.status(200).json({success:true , message:"Link has been sent to your email"})

    }
    catch(error)
    {
        next(error)
    }

}


export const ResetPassword =  async (req,res,next) => {

    const {token} = req.params

    const {password , confirmPassword} = req.body

    if(!password || !confirmPassword || password === "" || confirmPassword === "")
    {
        return next(errorHandler(400, "please fill all the fields"))
    }

    try
    {
        const decodedToken = jwt.verify(token , process.env.RESET_SECRETE)

        const user = await User.findById(decodedToken.id)

        if(!user)
        {
            return next(errorHandler(400, "user not found"))
        }

        if(password !== confirmPassword)
        {
            return next(errorHandler(400,"The password do not match"))
        }

        const hashedPassword = bcryptjs.hashSync(password ,10)

        user.password = hashedPassword

        await user.save()

        res.status(200).json({success:true , message:"password reset successful"})

    }
    catch(error)
    {
        next(error)
    }

}


export const ContactUs =  async (req,res,next) => {

    const {name,email,phone,subject,message} = req.body

    if(!name || !email || !phone || !subject || !message || email === "" || phone === "" || name === "" || subject === "" || message === "")
    {
        return next(errorHandler(400 ,"please fill all the required feilds"))
    }

    try
    {

        var transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.AUTH_USER,
                pass:process.env.AUTH_PASS
            }
        })

        const mailOptions = {
            from:`<${email}>`,
            to:process.env.AUTH_USER,
            subject:`Contact Form : ${subject}`,
            text:`
                Name:${name}
                Email:${email}
                Subject:${subject}
                Message:${message}
            `
        }

        transporter.sendMail(mailOptions ,(err,info) => {

            if(err)
            {
                console.log(err.message)
            }
            else
            {
                console.log("Email sent successfully " + info)
            }

        })

        res.status(200).json({success:true , message:"Message sent successfully"})

    }
    catch(error)
    {
        next(error)
    }

}
 