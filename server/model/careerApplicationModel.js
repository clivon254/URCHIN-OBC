


import mongoose from "mongoose"


const careerApplicationSchema = new mongoose.Schema(
    {
        user:{type:mongoose},

        
        PortfolioWebsite:{type:String },

        LinkedIn:{type:String},

        Career:{type:mongoose.Schema.Types.ObjectId , ref:"Intership" , required:true},

        ApplicationDate:{type:Date , default:Date().now},

        status:{type:String ,defualt:"Pending", enum:['Pending','under Reveiw', 'Accept','Rejected']},

        SkillsAndExpertise:{

            technical:{type:String , required:true},

            creative:{type:String , required:true},

            business:{type:String , required:true}
            
        },

        WorkExperiences:{

            currentOrLastEmployer:{type:String , required:true},

            jobTitle:{type:String , required:true},

            Duration:{type:Date , required:true},

            keyResponsibilities:{type:String , required:true},

            notableAchievement:{type:String , required:true},
        },

        Motivation:{

            reason:{type:String , required:true},

            next5Years:{type:String , required:true},

            howDoesThisAlign:{type:String , required:true}

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

        Resume:{type:String , required:true},

        CoverLetter:{type:String , required:true}
    },      
    {
        timestamps: true,
    }
)


const CareerApplication = mongoose.model('CareerApplication', careerApplicationSchema)



export default CareerApplication