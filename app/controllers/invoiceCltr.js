const Invoice = require('../models/invoice')
const {validationResult} = require('express-validator')
const invoiceCltr = {}

invoiceCltr.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
        const {body} = req
        const invoice = await new Invoice(body)
        enquiry.serviceProviderId = req.user.id
        enquiry.customerId = id
        invoice.save()
        res.status(201).json(invoice)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

invoiceCltr.update = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
        const {body} = req
        const invoice = await Invoice.findByIdAndUpdate({_id: id, serviceProviderId : req.user.id}, body,{new : true, runValidators:true})
        res.status(201).json(invoice)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

invoiceCltr.list = async(req,res)=>{
    try{
        const invoices = await Invoice.find()
        res.json(invoices)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

module.exports = invoiceCltr