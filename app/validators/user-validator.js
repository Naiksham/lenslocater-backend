const User = require('../models/user')
const role = require('../utils/role') 

const userRegisterSchema = {
    username : {
        notEmpty : {
            errorMessge : 'UserName is required'
        },
        trim : true
    },
    email : {
        notEmpty : {
            errorMessge : 'Email is required'
        },
        isEmail : {
            errorMessge : 'Email should be of a valid format'
        },
        custom : {
            options : async (value) => {
                const user = await User.findOne({email : value})
                if(!user){
                    return true
                } else {  
                    throw new error('Email already exists')
                }
            }
        },
        trim : true,
        normalizeEmail : true
    },
    password : {
        notEmpty : {
            errorMessge : 'Password is required'
        },
        isLength : {
            options : {min:8 , max:20},
            errorMessge : 'Password should consist of min 8 - max 20 characters'
        },
        trim : true
    },
    role : {
        notEmpty : {
            errorMessge : 'Role must be selected'
        },
        isIn : {
            options : [[role.admin, role.customer, role.serviceProvider]],
            errorMessge : 'Role should be selected within the options provided'
        },
        trim : true
    },
}

const userLoginSchema = {
    email : {
        notEmpty : {
            errorMessge : 'Email is required'
        },
        isEmail : {
            errorMessge : 'Enter valid Email format'
        },
        trim : true
    },
    password : {
        notEmpty : {
            errorMessge : 'Password is required'
        },
        isLength : {
            options : {min: 8, max: 20},
            errorMessge : 'Password should consist of min 8 - max 20 characters'
        },
        trim : true
    }
}

module.exports = {
    userRegisterSchema,
    userLoginSchema
}