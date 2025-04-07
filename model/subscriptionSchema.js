const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
    buyer : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service : {
        type:  mongoose.Schema.Types.ObjectId,
        ref : 'Services',
        required : true,
    },
    startDate : {
        type: Date,
        required: true,
    },
    endDate : {
        type : Date,
        required : true,
    },
    status : {
        type : String,
        enum : ['active', 'expired'],
        default : 'active'
    },
    paymentId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Payment',
    }
}, { timestamps: true });
  
module.exports = mongoose.model('Subscription', subscriptionSchema);  