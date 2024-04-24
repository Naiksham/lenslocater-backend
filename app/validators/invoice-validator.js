const Invoice = require('../models/invoice')
const User = require('../models/user')

const invoiceSchema =  {
    customerId : {
        notEmpty : {
            errorMessage : 'Customer ID is required'
        },
        isMongoId : {
            errorMessage : 'Customer ID must be a valid MongoDB ID'
        },
        custom : {
            options : async function(value, {req}) {
                const user = await User.findById(req.params.customerId)
                if(user){
                    return true
                } else {
                    throw new Error ('Record Not Found')
                }
            }
        },
        trim : true
    },
    serviceProviderId : {
        notEmpty : {
            errorMessage : 'Service Provider ID is required'
        },
        isMongoId : {
            errorMessage : 'Service Provider ID must be a valid MongoDB ID'
        },
        trim : true
    },
    invoiceDate : {
        notEmpty: {
            errorMessage: 'application date cannot be empty'
        },
        isDate : { 
            errorMessage: 'should be a valid date'
        },
        custom: {
            options: async function(value, { req }) {
                const invoice = await Invoice.findById(req.params.invoiceid)
                if(new Date(value) >= invoice.invoiceDate ) {
                    return true 
                }
            }
        },
        trim : true
    },
    lineItems : {
        custom : {
            options : function(value){
                if(!Array.isArray(value)){
                    throw new Error('lineItems should be an array')
                }
                if(value.length === 0){
                    throw new Error('categories array should have properties')
                }
                try{
                    value.forEach((ele)=>{
                        if(typeof ele.categoryId != 'mongo.id'){
                            throw new Error('categoryId should be a valid Mongo ID')
                        }
                        if(typeof ele.quantity != 'number'){
                            throw new Error('quantity should be a number')
                        }
                        if(ele.quantity < 1){
                            throw new Error('Quantity should be 1 or more than 1')
                        }
                        if(typeof ele.amount != 'number'){
                            throw new Error('amount should be a number')
                        }
                        if(ele.amount <= 0){
                            throw new Error('amount should be greater than 0')
                        }
                    })
                } catch(err){
                    throw new Error(err)
                }
                
            }
        }
    },
    amount : {
        notEmpty : {
            errorMessage : 'Amount should be entered'
        },
        isNumeric : {
            errorMessage : 'amount should be a number'
        },
        custom: {
            options: function() {
                if(amount >= 0) {
                    return true 
                } else {
                    throw new Error('Amount should be greater than 0')
                }
            }
        },
        trim : true
    }
}

module.exports = invoiceSchema

