

import mongoose from "mongoose"


const programApplicationSchema = new mongoose.Schema(
    {
        user:{type:mongoose.Schema.Types.ObjectId , ref:"User"},

        PortfolioWebsite:{type:String },

        LinkedIn:{type:String},

        program:{type:mongoose.Schema.Types.ObjectId , ref:"Program" , required:true},

        ApplicationDate:{type:Date , default:Date().now},

        status:{type:String ,defualt:"Pending", enum:['Pending','under Reveiw', 'Accepted','Rejected']},

        SkillsAndExpertise:{

            technical:{type:String , required:true},

            creative:{type:String , required:true},

            business:{type:String , required:true}
            
        },

        Motivation:{

            reason:{type:String , required:true},

            next5Years:{type:String , required:true},

            howDoesThisAlign:{type:String , required:true}

        },

        ProjectExperiences:{

            workedOnAny:{type:Boolean , },

            descriptionProject:{type:String },

            Link:{type:String },

            Awards:{type:String}

        },

        References:[{

            Name:{type:String , required:true},

            Relationship:{type:String , required:true},

            Phone:{type:String , required:true},

            Email:{type:String , required:true}
        }],

        AdditionalInformation:{

            relocation:{type:Boolean , default:false},

            visaSponsorship:{type:Boolean , default:false},

            disabilitesOrAccomodation:{type:Boolean , default:false}

        },

        CoverLetter:{type:String , required:true},

        resume:{type:String , required:true}
    },      
    {
        timestamps: true,
    }
)


const ProgramApplication = mongoose.model('ProgramApplication', programApplicationSchema)



export default ProgramApplication