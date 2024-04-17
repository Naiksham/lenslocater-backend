const {Schema, model} = require('mongoose')

const paymentSchema = new Schema({
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    invoiceId : {
        type : Schema.Types.ObjectId,
        ref : 'Invoice'
    },
    status : String,
    amount : Number
}, {timestamps: true})

const Payment = model('Payment', paymentSchema)

module.exports = Payment