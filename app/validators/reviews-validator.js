const Review = require('../models/reviews')

const reviewsSchema = {
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