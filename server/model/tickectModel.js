

import mongoose from "mongoose"


const ticketSchema = new mongoose.Schema(
    {
        ticketNumber:{type:String , required:true},

        event:{type:mongoose.Schema.Types.ObjectId , ref:'Event'},

        type:{type:Object ,required:true},

        attendeeDetails:{type:Object ,required:true},

        qrCodeData:{type:String},

        pdfTicket:{type:String},

        status:{type:String , default:"available" , enum:['available','booked','used']}
        
    }, 
    {
        timestamps: true
    }
)


const Ticket = mongoose.model('Ticket', ticketSchema)


export default Ticket 