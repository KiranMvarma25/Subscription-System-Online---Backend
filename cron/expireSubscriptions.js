const cron = require('node-cron');
const Subscription = require('../model/subscriptionSchema');

cron.schedule('0 0 * * *', async () => { 
    const now = new Date();
    await Subscription.updateMany(
        { endDate: { $lt: now }, status: 'active' },
        { status: 'expired' }
    );
    console.log("Expired subscriptions updated.");
});