
import mongoose from "mongoose"


const careerSchema = new mongoose.Schema(
    {
        title:{type:String ,required:true},

        description:{type:String ,required:true},

        company:{type:String ,required:true},

        location:{type:String ,required:true},

        jobType:{type:String ,required:true},

        responsibilities:{type:String ,required:true},

        qualifications:{type:String ,required:true},

        deadline:{type:Date ,required:true},
    },
    {
        timestamps: true,
    }
)

const Career = mongoose.model('Career', careerSchema)


export default Career