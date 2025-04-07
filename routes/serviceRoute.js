const express = require('express');
const { createService, getServices, getServiceById, updateService, deleteService } = require('../controllers/servicesController');

const servicesRouter = express.Router();

servicesRouter.post('/createService', createService);
servicesRouter.get('/getServices', getServices);
servicesRouter.get('/getService/:id', getServiceById);
servicesRouter.put('/updateService/:id', updateService);
servicesRouter.delete('/deleteService/:id', deleteService);

module.exports = servicesRouter;