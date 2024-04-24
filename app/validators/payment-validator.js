const paymentSchema = {
    customerId : {
        notEmpty : {
            errorMessage : 'Customer ID is Required'
        },
        isMongoId : {
            errorMessage : 'Customer ID must be a valid MongoDB ID'
        },
        trim : true
    },
    invoiceId : {
        notEmpty : {
            errorMessage : 'Invoice ID is required'
        },
        isMongoId : {
            errorMessage : 'Invoice ID must be a valid MongoDB ID'
        },
        trim : true
    },
    status : {
        notEmpty : {
            errorMessage : 'Status is required'
        },
        isIn : {
            options : ['Pending', 'Successful', 'Failed'],
            errorMessage : 'Status should be one of the options'
        },
        trim : true
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

module.exports = paymentSchema

