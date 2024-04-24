const enquirySchema = {
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

module.exports = enquirySchema