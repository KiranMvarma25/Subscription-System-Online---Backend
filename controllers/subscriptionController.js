const serviceSchema = require('../model/servicesSchema');
const subscriptionSchema = require('../model/subscriptionSchema');

exports.createSubscription = async (req, resp) => {
    try{
        const { buyer, service, startDate } = req.body;

        const overlapping = await subscriptionSchema.findOne({buyer, service,
            $or: [
                { startDate: { $lte: new Date(startDate) }, endDate: { $gte: new Date(startDate) } },
            ],
        });

        if(overlapping){
            return resp.status(400).json({ 
                success: false, 
                message: "Overlapping subscription exists" 
            });
        }

        const serviceDetails = await serviceSchema.findById(service);
        if(!serviceDetails){ 
            return resp.status(404).json({ 
                success: false, 
                message: "Service not found" 
            });
        }

        const start = new Date(startDate);
        let end = new Date(start.getTime()); 

        if (serviceDetails.duration === 'Monthly') {
            end.setMonth(end.getMonth() + 1);
        } else if (serviceDetails.duration === 'Yearly') {
            end.setFullYear(end.getFullYear() + 1);
        } else if (serviceDetails.duration === 'Weekly') {
            end.setDate(end.getDate() + 7);
        } else if (serviceDetails.duration === 'Quarterly') {
            end.setMonth(end.getMonth() + 3);
        }

        // console.log("Start Date:", start);
        // console.log("End Date:", end);
        

        const subscription = await subscriptionSchema.create({ buyer, service, startDate: start, endDate: end });

        resp.status(200).json({ 
            success: true, 
            message: 'Subscription created', 
            Subscription : subscription 
        });

    } 
    
    catch(err){
        console.error(err);
        resp.status(500).json({ 
            success: false, 
            message: 'Internal Server Error' 
        });
    }
};

exports.getSubscriptions = async (req, resp) => {
    try{
        const getsubscriptions = await subscriptionSchema.find().populate("buyer service paymentId");
        return resp.status(200).json({
            success : true,
            message : "Subscription Fetched Successfully",
            Subscription : getsubscriptions,
            });
        }
    
        catch(error){
            resp.status(500).json({
                success : false,
                message : "Internal Server Error"
            })
        }
};

exports.getSubscriptionsById = async (req, resp) => {
    try{
        const { userId, serviceId } = req.params;

        const subscription = await subscriptionSchema.findOne({ buyer: userId, service: serviceId }).populate("buyer service paymentId");

        if(!subscription || subscription.status !== 'active'){
            return resp.status(403).json({ 
                success: false,
                message: "Subscription expired or not found" 
            });
        }

        return resp.status(200).json({
            success: true,
            message: "Subscription fetched successfully",
            subscription: subscription,
        });
    } 
    
    catch(error){
        console.error(error);
        resp.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

exports.getSubscriptionsByDate = async (req, resp) => {
    const { start, end } = req.query;
    const startDate = new Date(start);
    const endDate = new Date(end);

    try{
        const subs = await subscriptionSchema.find({
            startDate: { $gte: startDate },
            endDate: { $lte: endDate }
        }).populate("buyer service paymentId");

        resp.status(200).json({ 
            success: true, 
            subscriptions: subs 
        });
    } 
    
    catch(err){
        resp.status(500).json({ 
            success: false,
             message: "Internal Server Error" 
        });
    }
};

exports.getUpcomingExpirations = async (req, resp) => {
    const days = parseInt(req.query.days || 7);
    const now = new Date();
    const upcomingDate = new Date(now);
    upcomingDate.setDate(now.getDate() + days);

    try{
        const upcoming = await subscriptionSchema.find({
            endDate: { $gte: now, $lte: upcomingDate },
            status: 'active'
        }).populate('buyer service paymentId');

        resp.status(200).json({ 
            success: true, 
            upcoming 
        });
    } 
    
    catch(error){
        resp.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

exports.getActiveMembersForService = async (req, resp) => {
    try{
        const { serviceId } = req.params;

        const activeSubscriptions = await subscriptionSchema.find({ service: serviceId, status: 'active'});

        resp.status(200).json({
            success: true,
            totalActiveMembers: activeSubscriptions.length
        });
    } 
    
    catch(err){
        resp.status(500).json({ 
            success: false,
             message: 'Internal Server Error' 
        });
    }
};