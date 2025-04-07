const mongoose = require('mongoose');

const servicesSchema = new mongoose.Schema({
    serviceName  : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    discount : {
        type: Number,
        default: 0,
        min: 0,
        max: 100,
    },
    finalPrice : {
        type: Number, 
    },
    duration : {
        type: String,
        required: true,
    }, 
    otherPlanDetails : { 
        type: String, 
        required: true,
    }, 
    category : {
        type: String, 
        required: true,
    },
    seller : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

module.exports = mongoose.model('Services', servicesSchema);