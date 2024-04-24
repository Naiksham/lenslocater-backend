const ServiceProvider = require('../models/serviceProvider')
const Gallery = require('../models/gallery')
const {validationResult} = require('express-validator')
serviceProviderCltr = {}
adminCltr = {}

serviceProviderCltr.create = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
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
    