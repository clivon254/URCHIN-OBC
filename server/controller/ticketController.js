
import Event from "../model/eventModel.js"
import Ticket from "../model/tickectModel.js"
import { errorHandler } from "../utilis/error.js"
import { generateRandomNumber } from "../utilis/verify.js"
import QRCode from "qrcode"
import PDFDocument from "pdfkit"
import fs from "fs"
import path from "path"
import {initializeApp} from "firebase/app"
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"



const firebaseConfig = {
    apiKey: "AIzaSyCqSmFWiwQmLJXWl1IggAwHxTbzXVR75sY",
    authDomain: "projects-ff64b.firebaseapp.com",
    projectId: "projects-ff64b",
    storageBucket: "projects-ff64b.appspot.com",
    messagingSenderId: "659659661260",
    appId: "1:659659661260:web:865acaef68b0a3c4bf4769"
  };


const app = initializeApp(firebaseConfig)


const storage = getStorage(app)



export const bookTicket = async (req,res,next) => {

    const {ticketType,event,attendeeDetails} = req.body

    const eventCheck = await Event.findById(event)

    if(!eventCheck)
    {
        return next(errorHandler(404, "event not found"))
    }

    if(eventCheck.available <= 0 )
    {
        return next(errorHandler(403 ,"Tickets are sold out"))
    }

    try
    {
        const ticketNumber = generateRandomNumber()

        const type = ticketType.name

        const ticket = new Ticket({
            ticketNumber ,
            event,
            attendeeDetails,
            type
        })

        
        // QR CODE
        const qrCodeData = JSON.stringify({
            id:ticket._id
        })
        
        const qrCodeImage = await QRCode.toDataURL(qrCodeData)


        // Generate PDF

            // const pdfFileName = `${ticket.ticketNumber}.pdf`;

            // const pdfPath = path.join('uploads', pdfFileName);


        const doc = new PDFDocument();

           // const writeStream = fs.createWriteStream(pdfPath);

           // doc.pipe(writeStream);

        const buffers = []


        doc.on('data', buffers.push.bind(buffers))


        // Add content to PDF
        doc.fontSize(20).text('Event Ticket', { align: 'center' });
        doc.moveDown();
        doc.fontSize(14).text(`Ticket Number: ${ticket.ticketNumber}`);
        doc.text(`Event ID: ${ticket.event}`);
        doc.text(`Attendee: ${attendeeDetails.name || 'N/A'}`);
        doc.text(`Type: ${ticket.type.name || 'N/A'}`);
        doc.moveDown();
        doc.text('Scan QR Code for Details:', { align: 'center' });
        doc.image(qrCodeImage, {
        fit: [150, 150],
        align: 'center',
        valign: 'center',
        });

        doc.end()

        // wait pdf to finish writing

        const pdfData = await new Promise((resolve) => {

            doc.on('end', () => {

                resolve(Buffer.concat(buffers))

            })

        })


        // Upload the PDF to firebase Storage
        const storageRef = ref(storage , `tickets/${ticket.ticketNumber}.pdf`)

        // upload buffer to firebase
        await uploadBytes(storageRef, pdfData ,{
            contentType: 'application/pdf',
        })

        const downloadURL = await getDownloadURL(storageRef)

          // await new Promise((resolve) => writeStream.on('finish', resolve))

        ticket.qrCodeData = qrCodeData 

        ticket.pdfTicket = downloadURL;

          // ticket.pdfTicket = `${req.protocol}://${req.get('host')}/uploads/${pdfFileName}`; 

        await ticket.save()

        res.status(200).json({success:true , ticket , message:"Ticket booked successfully"})

    }

    catch(error)
    {
        next(error)
    }

}


export const scanTicket = async (req,res,next) => {

    try
    {}
    catch(error)
    {
        next(error)
    }

}


export const getTicket = async (req,res,next) => {

    try
    {
        const {ticketId} = req.params

        const ticket = await Ticket.findById(ticketId)

        if(!ticket)
        {
            return next(errorHandler(404,"ticket not found"))
        }

        res.status(200).json({success:true ,  ticket})

    }
    catch(error)
    {
        next(error)
    }

}


export const getTickets = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed access all tickets"))
    }

    try
    {
        const tickets = await Ticket.find().sort({_id:-1})

        res.status(200).json({success:true , tickets})

    }
    catch(error)
    {
        next(error)
    }

}


export const updateTicket = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update ticket"))
    }

    const {ticketId} = req.params 

    const ticket = await Ticket.findById(ticketId)

    if(!ticket)
    {
        return next(errorHandler(404,"ticket not found"))
    }

    try
    {

        const updatedTickets = await Ticket.findByIdAndUpdate(
            ticketId ,
            {
                $set:{
                    status:req.body.status
                },
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedTickets})

    }
    catch(error)
    {
        next(error)
    }

}


export const deleteTicket = async (req,res,next) => {
    
    if(!req.user.isAdmin)
    {
        return next(errorHandler(403 ,"You are not allowed to update ticket"))
    }

    const {ticketId} = req.params 

    const ticket = await Ticket.findById(ticketId)

    if(!ticket)
    {
        return next(errorHandler(404,"ticket not found"))
    }

    try
    {

        await Ticket.findByIdAndDelete(ticketId)

        res.status(200).json({success:true , message:`${ticket.ticketNumber} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}