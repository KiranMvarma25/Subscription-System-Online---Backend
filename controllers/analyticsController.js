const subscriptionSchema = require('../model/subscriptionSchema');
const paymentSchema = require('../model/paymentSchema');

exports.serviceAnalytics = async (req, resp) => {
    try{
        const stats = await subscriptionSchema.aggregate([
            {
                $group: {
                    _id: "$service",
                    totalSubscriptions: { $sum: 1 },
                    active: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "active"] }, 1, 0]
                        }
                    },
                    expired: {
                        $sum: {
                            $cond: [{ $eq: ["$status", "expired"] }, 1, 0]
                        }
                    }
                }
            }
        ]);

        resp.status(200).json({ 
            success: true, data: 
            stats 
        });
    } 
    
    catch(err){
        resp.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};

exports.totalRevenue = async (req, res) => {
    try {
        const { start, end, serviceId } = req.query;

        const filter = {};
        if(start && end){
            filter.createdAt = { $gte: new Date(start), $lte: new Date(end) };
        }
        if(serviceId){
            filter.subscriptionId = { $in: await subscriptionSchema.find({ service: serviceId }).distinct('_id') };
        }

        const payments = await paymentSchema.find(filter).sort({ createdAt: -1 });

        const totalRevenue = payments.reduce((acc, p) => acc + p.amount, 0);

        res.status(200).json({
            success: true,
            totalRevenue,
            payments
        });
    } 
    
    catch(err){
        res.status(500).json({ 
            success: false, 
            message: "Internal Server Error" 
        });
    }
};