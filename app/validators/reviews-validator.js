const Review = require('../models/reviews')

const reviewsSchema = {
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
    review : {
        notEmpty : {
            errorMessage : 'Review is required'
        },
        trim : true
    },
    rating : {
        notEmpty : {
            errorMessage : 'Rating is required'
        },
        trim : true
    }
}

module.exports = reviewsSchema