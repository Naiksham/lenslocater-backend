const Enquiry = require('../models/enquiry')
const {validationResult} = require('express-validator')
const enquiryCltr = {}

enquiryCltr.create = async(req, res)=>{
    try{

    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}