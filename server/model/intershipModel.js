


import mongoose from "mongoose"


const intershipSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},

        description:{type:String , required:true},

        company:{type:String , required:true},

        location:{type:String , required:true},

        startDate:{type:Date , required:true},

        duration:{type:String , required:true},

        title:{type:String , required:true},

        responsiblities:{type:String , required:true},

        qualification:{type:String , required:true},

        internshipType:{type:String , required:true},

        deadline:{type:Date , required:true},
    },
    {
        timestamps: true,
    }
)


const Intership = mongoose.model('Intership', intershipSchema)


export default Intership