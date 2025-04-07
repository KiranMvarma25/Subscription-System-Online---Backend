const servicesSchema = require('../model/servicesSchema');

exports.createService = async (req,resp) => {
    try{
        const { serviceName, price, discount = 0, duration, otherPlanDetails, category, seller } = req.body;

        if(!serviceName || !price || !duration || !otherPlanDetails || !category || !seller){
            return resp.status(400).json({
                success : false,
                message : "Please Fill All the Details"
            })
        }

        let finalPrice;
        if(discount > 0 || discount <= 100){
            finalPrice = price - (price * (discount / 100)); 
        }

        if(discount < 0 || discount > 100){
            return resp.status(400).json({
              success: false,
              message: "Discount should be between 0 and 100",
            });
        }

        const createdService = await servicesSchema.create({ serviceName, price, discount, finalPrice, duration, otherPlanDetails, category, seller });
        
        return resp.status(200).json({
            success : true,
            message : "Service Created Successfully",
            Service : createdService,
        });

    }
    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getServices = async(req,resp) => {
    try{
        const getservices = await servicesSchema.find().populate("seller", "name email");
        return resp.status(200).json({
            success : true,
            message : "Services Fetched Successfully",
            Service : getservices,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.getServiceById = async(req,resp) => {
    try{
        const { id } = req.params;

        const getservicebyid = await servicesSchema.findById(id).populate("seller");

        if(!getservicebyid){
            return resp.status(404).json({
                success: false,
                message: `Service with ID ${id} not found`,
            });
        }

        return resp.status(200).json({
            success : true,
            message : "Service Fetched By Id Successfully",
            Service : getservicebyid,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.updateService = async(req,resp) => {
    try{
        const { id } = req.params;
        const { serviceName, price, discount, duration, otherPlanDetails, category, seller } = req.body;

        if(discount < 0 || discount > 100){
            return resp.status(400).json({
              success: false,
              message: "Discount should be between 0 and 100",
            });
        } 

        let finalPrice;
        if(discount > 0 || discount <= 100){
            finalPrice = price - (price * (discount / 100)); 
        }

        const updatedservice = await servicesSchema.findByIdAndUpdate({_id : id}, {serviceName, price, discount, finalPrice, duration, otherPlanDetails, category, seller}, { new: true });
        
        if(!updatedservice){
            return resp.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return resp.status(200).json({
            success : true,
            message : "Updated Service Successfully",
            Service : updatedservice,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}

exports.deleteService = async(req,resp) => {
    try{
        const { id } = req.params;

        const deleteservice = await servicesSchema.findByIdAndDelete(id);
        
        if(!deleteservice){
            return resp.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return resp.status(200).json({
            success : true,
            message : "Deleted Service Successfully",
            Service : deleteservice,
        });
    }

    catch(error){
        resp.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}