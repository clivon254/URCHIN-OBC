
import mongoose from "mongoose"


const donationSchema = new mongoose.Schema(
    {
        type:{type:String , required:true},

        category:{type:String ,required:true},

        personalInfo:{type:Object },

        billingAddress:{type:Object },

        payment:{type:Boolean , default:false},

        paymentmethod:{type:String , required:true}

    },
    {
        timestamps:true
    })

const Donation = mongoose.model('Donation', donationSchema)


export default Donation