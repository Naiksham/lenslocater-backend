const mongoose = require('mongoose')

const {Schema, model} = mongoose 

const serviceProviderSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    mobile : String,
    serviceType : [String], // photograhpy, videography
    categories : [{ name: '', amount: '' }], // ['weddding', 'baby shoot', 'birthday]
    isVerified : Boolean,
socialLinks : String,
    location : String,
    // geo : {
    //     lat : Number,
    //     lng : Number
    // }
}, {timestamps: true})

const ServiceProvider = model('ServiceProvider', serviceProviderSchema)

module.exports = ServiceProvider

