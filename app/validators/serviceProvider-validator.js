const { Error } = require('mongoose')
const ServiceProvider = require('../models/serviceProvider')
const serviceType = require('../utils/service-type')

const serviceProviderSchema = {
    mobile : {
        notEmpty : {
            errorMessage : 'Mobile number is required'
        },
        isNumeric : {
            errorMessage : 'Mobile should be in Number'
        },
        isLength : {
            options : {min : 10, max : 10}
        },
        trim : true
    },
    serviceType : {
        notEmpty : {
            errorMessage : 'Service Type should be selected'
        },
        isIn : {
            options : [[serviceType.photography, serviceType.videography]],
            errorMessage : 'Service Type should be selected witn the options provided'
        },
        trim : true
    },
    categories : {
        notEmpty : {
            errorMessage : 'Categories should be selected'
        },
        isIn : {
            options : ['wedding', 'events', 'baby', 'birthday', 'nature', 'travel'],
            errorMessage : 'Categories must selected within the list'
        },
        trim : true
    },
    // userId : {
    //     notEmpty : {
    //         errorMessage : 'User ID is required'
    //     },
    //     isMongoId : {
    //         errorMessage : 'User ID must be a valid MongoDB ID'
    //     },
    //     trim : true
    // },
    socialLinks : {
        notEmpty : {
            errorMessage : 'Links should be provided'
        },
        trim : true
    },
    location : {
        notEmpty : {
            errorMessage : 'Location must be entered'
        },
        trim : true
    }
}

module.exports = serviceProviderSchema