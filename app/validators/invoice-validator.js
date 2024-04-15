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
        in: ['body'], 
        exists: {
            errorMessage: 'application date is required'
        }, 
        notEmpty: {
            errorMessage: 'application date cannot be empty'
        },
        isDate : { 
            errorMessage: 'should be a valid date'
        },
        custom: {
            options: async function(value) {
                if(new Date(value) >= new Date()) {
                    return true 
                } else {
                    throw new Error("Invoice Date should be greater than present Date")
                }
            }
        },
        trim : true
    }
}

module.exports = invoiceSchema