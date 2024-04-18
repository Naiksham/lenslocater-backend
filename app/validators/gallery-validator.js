const Gallery = require('../models/gallery')
 
const gallerySchema = {
    title : {
        notEmpty : {
            errorMessage : 'Title is required'
        },
        trim : true
    }
}

module.exports = gallerySchema

