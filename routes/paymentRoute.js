const express = require('express');
const { createPayment, getInvoicesByUser } = require('../controllers/paymentController');

const paymentRouter = express.Router();

paymentRouter.post('/createpayment', createPayment);
paymentRouter.get('/invoices/:userId', getInvoicesByUser);

module.exports = paymentRouter;