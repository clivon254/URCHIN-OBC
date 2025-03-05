

import express from "express"
import { callbackDonation, confirmDonation, deleteDonation, getDonations, mpesaDonation, updateDonation } from "../controller/donationController.js"
import { generateAccessToken, verifyToken } from "../utilis/verify.js"



const donationRouter = express.Router()



donationRouter.post('/mpesa-Donation', generateAccessToken, mpesaDonation)



donationRouter.post('/callback' , callbackDonation)



donationRouter.post('/confirm-donation/:donationId/:CheckoutRequestID' ,generateAccessToken , confirmDonation)



donationRouter.get('/get-donation/:donationId', getDonations)



donationRouter.get('/get-donations', verifyToken , getDonations)



donationRouter.put('/update-donation/:donationId',verifyToken , updateDonation)



donationRouter.delete('/delete-donation/:donationId',verifyToken , deleteDonation)




export default donationRouter