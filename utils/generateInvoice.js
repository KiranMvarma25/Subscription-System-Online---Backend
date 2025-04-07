const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const generateInvoice = (payment, subscription, service, buyer, outputPath) => {
    
    return new Promise((resolve, reject) => {
        
        const doc = new PDFDocument();

        const stream = fs.createWriteStream(outputPath);
        doc.pipe(stream);

        doc.fontSize(20).text("INVOICE", { align: "center" });

        doc.moveDown();
        doc.fontSize(12).text(`Invoice Number: ${payment.invoiceNumber}`);
        doc.text(`Date: ${new Date(payment.createdAt).toLocaleDateString()}`);
        doc.text(`Buyer: ${buyer.name} (${buyer.email})`);
        doc.text(`Service: ${service?.serviceName || 'N/A'}`);
        doc.text(`Subscription Duration: ${subscription.startDate.toDateString()} - ${subscription.endDate.toDateString()}`);
        doc.text(`Amount Paid: ₹${payment.amount}`);
        doc.text(`Payment Method: ${payment.paymentMethod}`);

        doc.end();

        stream.on("finish", () => {
            resolve(outputPath);
        });

        stream.on("error", reject);
    });
};

module.exports = generateInvoice;