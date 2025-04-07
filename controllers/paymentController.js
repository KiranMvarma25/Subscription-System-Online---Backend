const paymentSchema = require('../model/paymentSchema');
const subscriptionSchema = require('../model/subscriptionSchema');
const { v4: uuidv4 } = require('uuid');

const generateInvoice = require("../utils/generateInvoice");
const path = require("path");

exports.createPayment = async (req, res) => {
    try{
        const { buyer, subscription, amount, paymentMethod } = req.body;

        const subscriptionData = await subscriptionSchema
            .findById(subscription)
            .populate([
                { path: "buyer" },
                { path: "service" }
            ]);

        if(!subscriptionData){
            return res.status(404).json({ 
                success: false,
                message: "Subscription not found" 
            });
        }

        const invoiceNumber = `INV-${uuidv4().slice(0, 8).toUpperCase()}`;

        const payment = await paymentSchema.create({buyer, subscription, amount, paymentMethod, invoiceNumber});

        subscriptionData.paymentId = payment._id;
        await subscriptionData.save();

        const fileName = `${invoiceNumber}.pdf`;
        const outputPath = path.join(__dirname, `../invoices/${fileName}`);
        await generateInvoice(payment, subscriptionData, subscriptionData.service, subscriptionData.buyer, outputPath);

        const invoiceUrl = `http://localhost:2525/invoices/${fileName}`;

        res.status(201).json({
            success: true,
            message: "Payment recorded",
            payment,
            invoiceUrl
        });
    } 
    
    catch(error){
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};


exports.getInvoicesByUser = async (req, res) => {
    try{
        const { userId } = req.params;
        const payments = await paymentSchema.find({ buyer: userId }).populate('subscription');
        res.status(200).json({ 
            success: true, 
            invoices: payments 
        });
    } 
    
    catch(error){
        console.error(error);
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};