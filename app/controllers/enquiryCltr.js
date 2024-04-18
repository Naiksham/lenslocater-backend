const Enquiry = require('../models/enquiry')
const {validationResult} = require('express-validator')
const enquiryCltr = {}

enquiryCltr.create = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try {
        const { body } = req ;
        const enquiry = new Enquiry(body);
        enquiry.customerId = req.user.id
        enquiry.serviceProviderId = id
        await enquiry.save();
        res.status(201).json({ message: 'Enquiry created successfully', enquiry });
      } catch (error) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
}

enquiryCltr.update = async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
        const {body} = req
        const enquiry = await Enquiry.findOneAndUpdate({serviceProviderId : req.user.id}, body, {new : true, runValidators : true})
        res.status(200).json(enquiry)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}


module.exports = enquiryCltr