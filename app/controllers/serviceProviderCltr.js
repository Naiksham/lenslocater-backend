const ServiceProvider = require('../models/serviceProvider')
const Gallery = require('../models/gallery')
const {validationResult} = require('express-validator')
const { serviceProvider } = require('../utils/role')
serviceProviderCltr = {}
adminCltr = {}

serviceProviderCltr.create = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        // const id = req.params.id
        const {body} = req
        const serviceProvider = new ServiceProvider(body)
        serviceProvider.userId = req.user.id
        await serviceProvider.save()
        res.status(200).json(serviceProvider)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}
serviceProviderCltr.list = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find().populate('userId');
        res.status(200).json(serviceProviders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Fetch a single service provider by ID
serviceProviderCltr.listOne = async (req, res) => {
    // console.log('hi')
    try {
        const serviceProvider = await ServiceProvider.find({userId:req.params.id}).populate('userId');
        if (!serviceProvider) {
            return res.status(404).json({ message: 'Service provider not found' });
        }
        res.status(200).json(serviceProvider);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

serviceProviderCltr.update = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
        const {body} = req
        const serviceProvider = await ServiceProvider.findOneAndUpdate({userId : req.user.id}, body, {new : true, runValidators : true})
        res.status(201).json(serviceProvider)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

serviceProviderCltr.delete = async (req, res)=>{
    try{
        const id = req.params.id
        const serviceProvider = await ServiceProvider.findByIdAndDelete(id)
        res.status(201).json(serviceProvider)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

module.exports = serviceProviderCltr
    