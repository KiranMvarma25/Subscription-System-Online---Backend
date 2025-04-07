const express = require('express');
const { serviceAnalytics, totalRevenue } = require('../controllers/analyticsController');

const analyticsRouter = express.Router();

analyticsRouter.get('/service', serviceAnalytics);
analyticsRouter.get('/revenue', totalRevenue);

module.exports = analyticsRouter;