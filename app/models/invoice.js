const {Schema, model} = require('mongoose')

const invoiceSchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    }, 
    serviceProviderId : {
        type : Schema.Types.ObjectId,
        ref : 'ServiceProvider'
    },
    invoiceDate : new Date(),
    lineItems : [{}],
    amount : Number
}, {timestamps : true})

const Invoice = model('Invoice', invoiceSchema)

module.exports = Invoice