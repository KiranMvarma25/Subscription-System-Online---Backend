const express = require('express');
const { createSubscription, getSubscriptionsByDate, getSubscriptions, getSubscriptionsById, getUpcomingExpirations, getActiveMembersForService, serviceAnalytics } = require('../controllers/subscriptionController');

const subscriptionRouter = express.Router();

subscriptionRouter.post('/createSubscription', createSubscription);
subscriptionRouter.get('/getSubscriptions', getSubscriptions);
subscriptionRouter.get('/checkSubscription/:userId/:serviceId', getSubscriptionsById);
subscriptionRouter.get('/getSubscriptionByDate', getSubscriptionsByDate);
subscriptionRouter.get('/upcoming', getUpcomingExpirations);

subscriptionRouter.get('/active/:serviceId', getActiveMembersForService);

module.exports = subscriptionRouter;