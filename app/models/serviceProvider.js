const mongoose = require('mongoose')

const {Schema, model} = mongoose 

const serviceProviderSchema = new Schema({
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    mobile : String,
    serviceType : [String], // photograhpy, videography
    categories : [{
        name : String,
        amount : Number
    }], // ['weddding', 'baby shoot', 'birthday]
    isVerified : {
        type : Boolean,
        default : false
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    socialLinks : String,
    location : String,
    // geo : {
    //     lat : Number,
    //     lng : Number
    // }
}, {timestamps: true})

const ServiceProvider = model('ServiceProvider', serviceProviderSchema)

module.exports = ServiceProvider

