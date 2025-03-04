

import mongoose from "mongoose"


const innovationSchema = new mongoose.Schema(
    {
        technologyResearchTrends:{

            emergingTechnologies:{type:Array , required:true},

            ongoingProjects:{type:Array , required:true},

            marketAdoption:{type:Array, required:true},

            problemSolving:{type:Array , required:true}

        },

        intellectualProperty:{

            patentsFiled:{type:Array , required:true},

            copyRight:{type:Array , required:true},

            openSource:{type:Array , required:true},

        },

        fundingInvestData:{

            availableGrants:{type:Array , required:true},

            crowdFunding:{type:Array , required:true},

            rdBudgets:{type:Array , required:true},

            governmentInnovationPolicies:{type:Array , required:true},

        },

        marketIndustryInsights:{

            demandedSkills:{type:Array , required:true},

            competetiveAnalysis:{type:Array , required:true},

            consumerAnalysis:{type:Array , required:true},

            regulationRequirements:{type:Array , required:true},

        },

        prototypingData:{

            numberOfPrototypes:{type:Array , required:true},

            userFeedback:{type:Array , required:true},

            successRate:{type:Array , required:true},

            scalabilityPotential:{type:Array , required:true},
        },

        collaborations:{

            jointVentures:{type:Array , required:true},

            universityAndGovernments:{type:Array , required:true},

            openInnovation:{type:Array , required:true},

            industryNetwork:{type:Array , required:true},

        },
        
        operationalBusinessData:{

            financialData:{

                revenueStreams:{type:Array , required:true},

                cashFlow:{type:Array , required:true},

                financialProjections:{type:Array , required:true},

                costInnovation:{type:Array , required:true}
            },

            customerClientData:{

                targetMarket:{type:Array , required:true},

                clientAcquisation:{type:Array , required:true},

                customertFeedback:{type:Array , required:true},

            },

            infrastructureResources:{

                availableSpaces:{type:Array , required:true},

                techTools:{type:Array , required:true},

                dataProtectionFramwork:{type:Array , required:true},
            },

            legalCompliance:{

                businessRegistration:{type:Array , required:true},

                NDA:{type:Array , required:true},

                dataPrivacyPolicies:{type:Array , required:true},
            }

        }
    },
    {
        timestamps: true,
    }
)

const Innovation = mongoose.model('Inovation' , innovationSchema)


export default Innovation