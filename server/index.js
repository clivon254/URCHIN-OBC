

import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import serviceRouter from "./router/serviceRouter.js"
import blogRouter from "./router/blogRouter.js"
import roleRouter from "./router/roleRouter.js"
import partnerRouter from "./router/partnerRouter.js"
import programRouter from "./router/programRouter.js"
import careerRouter from "./router/careerRouter.js"
import intershipRouter from "./router/intershipRouter.js"
import programApplicationRouter from "./router/programApplicationRouter.js"
import careerApplicationRouter from "./router/careerApplicationRouter.js"
import talentRouter from "./router/talentRouter.js"
import innovationRouter from "./router/innovationRouter.js"
import eventRouter from "./router/eventRouter.js"
import ticketRouter from "./router/ticketRouter.js"
import donationRouter from "./router/donationRouter.js"


const app = express()

const PORT = process.env.PORT


app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:5173","https://urchin-obc-server.onrender.com","https://urchin-obc-admin.onrender.com"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true,
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser())


app.use('/uploads', express.static('uploads'))



// app.use(morgan("dev"))




// DB CONNECTION
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB CONNECTED"))
.catch((error) => console.log(error))
 


// API
app.get("/" , (req,res) => {

    res.send("HELLO URCHIN'OBC")

})



// ROUTES

app.use('/api/auth', authRouter)


app.use('/api/user', userRouter)


app.use('/api/service', serviceRouter)


app.use('/api/blog', blogRouter)


app.use('/api/role', roleRouter)


app.use('/api/partner', partnerRouter)


app.use('/api/program', programRouter)


app.use('/api/programApplication', programApplicationRouter)


app.use('/api/career', careerRouter)


app.use('/api/careerApplication', careerApplicationRouter)


app.use('/api/intership', intershipRouter)


app.use('/api/talent', talentRouter)


app.use('/api/innovation' , innovationRouter)


app.use('/api/event', eventRouter)


app.use('/api/ticket', ticketRouter)


app.use('/api/donation', donationRouter)







// listening
app.listen(PORT ,(err) => {

    if(err)
    {
        console.log(err.message)
    }
    else
    {
        console.log(`server running on ${PORT}`)
    }

})



app.use((err,req,res,next) => {

    const statusCode = err.statusCode || 500 

    const message = err.message || "Internal server error"

    console.log("Ni ya HUKU " + err)

    res.status(statusCode).json({success:false , message:message})

})

