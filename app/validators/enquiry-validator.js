const enquirySchema = {
    customerId : {
        notEmpty : {
            errorMessage : 'Customer ID is required'
        },
        isMongoId : {
            errorMessage : 'Customer ID must be a valid MongoDB ID'
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
    message : {
        notEmpty : {
            errorMessage : 'Review is required'
        },
        trim : true
    },
    response : {
        notEmpty : {
            errorMessage : 'Rating is required'
        },
        trim : true
    }
}