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
    invoiceDate : Date,
    lineItems : [{
        categoryId: Schema.Types.ObjectId,
        quantity: Number, 
        amount: Number
    }],
    amount : Number
}, {timestamps : true})

const Invoice = model('Invoice', invoiceSchema)

module.exports = Invoice
