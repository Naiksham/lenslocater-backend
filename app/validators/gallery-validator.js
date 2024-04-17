const Gallery = require('../models/gallery')
 
const gallerySchema = {
    title : {
        notEmpty : {
            errorMessage : 'Title is required'
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
    }
}

module.exports = gallerySchema

