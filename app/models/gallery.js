const {Schema, model} = require('mongoose')

const gallerySchema = new Schema({
    title : String,
    serviceProviderId : {
        type : Schema.Types.ObjectId,
        ref : 'ServiceProvider' 
        
    },
    media : [String]
}, {timestamps: true})

const Gallery = model('Gallery', gallerySchema)

module.exports = Gallery
