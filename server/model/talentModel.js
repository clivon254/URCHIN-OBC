


import mongoose from "mongoose"


const talentSchema = new  mongoose.Schema(
    {
        generalInfor:{

            user:{type:mongoose.Schema.Types.ObjectId , ref:"User"}, 

            Nationality:{type:String , required:true},

            workStatus:{type:Boolean , required:true}
        },
        skillExpertise:{

            educationHistory:{type:Array ,required:true},

            TechnicallAssesment:{type:Array ,required:true},

            workExperience:{type:Array ,required:true},

            contributions:{type:Array , required:true},

            pastWorks:{type:Array ,required:true}
        },
        performanceAndAchievements:{

            awards:{type:Array ,required:true},

            Participation:{type:Array ,required:true},

            performanceMetrics:{type:String ,required:true}

        },
        workPrefrences:{

            availability:{type:String ,required:true},

            preferredIndustries:{type:String ,required:true},

            preferredLocation:{type:String , required:true},

            salaryExpectations:{type:String ,required:true}

        },
        networkCollaboration:{

            portfolio:{type:Array ,required:true},

            professionalAffiliations:{type:Array ,required:true},

            Recommendations:{type:Array ,required:true}
        }
    },
    {
        timestamps: true
    }
)


const  Talent = mongoose.model('Innovation', talentSchema)


export default Talent