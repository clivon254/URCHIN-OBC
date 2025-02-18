

import mongoose from "mongoose"


const blogSchema = new mongoose.Schema(
    {
        title:{type:String , required:true},

        description:{type:String , required:true},

        category:{type:String , required:true},

        slug:{type:String , required:true , unique:true},

        userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},

        images:{type:Array , required:true},

        status:{type:Boolean , default:false}
    },
    {
        timestamps:true
    }
)


const Blog = mongoose.model('Blog' , blogSchema)


export default Blog

