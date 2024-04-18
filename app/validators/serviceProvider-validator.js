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
    categories: {
        custom: {
            options: function(value){
                if(!Array.isArray(value)) {
                    throw new Error('categories should be an array')
                }
                if(value.length === 0){
                    throw new Error('categories array should have properties')
                }
                try {
                    value.forEach((ele) => {
                        if(typeof ele.name != 'string'){
                            throw new Error('name should be a string')
                        }
                        if((!['wedding', 'babyphots', 'events', 'nature', 'travel', 'drone'].includes(ele.name.toLowerCase()))){
                            throw new Error('categories should be selected within provided list')
                        }
                        if(typeof ele.amount != 'number'){
                            throw new Error('amount should be a number')
                        }
                        if(ele.amount <= 0){
                            throw new Error('amount should be greater than 0')
                        }
                    })
                } catch(err) {
                    throw new Error(err)
                }
                return true 
            }
        }
    },
    // categories : {
    //     custom : {
    //         options : function(value){
    //             if(!Array.isArray(value)){
    //                 throw new Error('categories should be an array')
    //             }
    //             if(value.length === 0){
    //                 throw new Error('categories array should have properties')
    //             }
    //             value.forEach((ele)=>{
    //                 if(typeof ele.name != 'string'){
    //                     throw new Error('name should be a string')
    //                 }
    //                 if((!['Wedding', 'BabyPhots', 'Events', 'Nature', 'Travel', 'Drone'].includes(ele.name))){
    //                     throw new Error('categories should be selected within provided list')
    //                 }
    //                 if(typeof ele.amount != 'number'){
    //                     throw new Error('amount should be a number')
    //                 }
    //                 if(ele.amount <= 0){
    //                     throw new Error('amount should be greater than 0')
    //                 }
    //             })
    //             console.log(value)
    //         }
    //     },
    //     trim : true
    // },
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