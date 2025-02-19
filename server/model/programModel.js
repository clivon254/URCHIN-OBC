
import mongoose from "mongoose"


const programSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},

        catergory:{type:String , required:true , enum: ['Training', 'Workshop', 'Mentorship', 'Competition']},

        description:{type:String , required:true},

        DateOfBirth:{type:Date , required:true},

        startDate:{type:Date , required:true},

        enrolled:[{type:mongoose.Schema.Types.ObjectId , ref:"User"}],

        endDate:{type:Date},

        location:{type:String , required:true },

        applicationDeadline:{type:Date},

        eligibility:{type:Date , required:true},

        programFee:{type:Number },

        capacity:{type:Number},

        instructors:[{type:mongoose.Schema.Types.ObjectId , ref:'User'}]
    },  
    {
        timestamps:true
    }
)

const Program = mongoose.model('Program', programSchema)


export default Program