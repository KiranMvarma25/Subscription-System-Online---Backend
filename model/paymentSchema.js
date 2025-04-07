const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    buyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    subscription : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
    },
    amount : {
        type: Number,
        required: true,
    },
    paymentDate : {
        type: Date,
        default: Date.now,
    },
    paymentMethod : {
        type: String,
        enum: ['Credit Card', 'Debit Card', 'UPI', 'Cash', 'Net Banking'],
        required: true,
    },
    invoiceNumber : {
        type: String,
        unique: true,
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);