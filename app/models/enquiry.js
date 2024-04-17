const {Schema, model} = require('mongoose')

const enquirySchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    serviceProviderId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    message : String,
    response : String
}, {timestamps : true})

const Enquiry = model('Enquiry', enquirySchema)

module.exports = Enquiry
