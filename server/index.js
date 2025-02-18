

import express from "express"
import mongoose from "mongoose"
import "dotenv/config"
import cookieParser from "cookie-parser"
import cors from "cors"
import morgan from "morgan"
import authRouter from "./router/authRouter.js"
import userRouter from "./router/userRouter.js"
import serviceRouter from "./router/serviceRouter.js"


const app = express()

const PORT = process.env.PORT


app.use(
    cors({
        origin:["http://localhost:3000","http://localhost:3000"],
        methods:["GET","POST","DELETE","PUT"],
        credentials:true
    })
)

app.use(express.json())

app.use(express.urlencoded({ extended: true }));


app.use(cookieParser())


// app.use(morgan("dev"))




// db connection
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

