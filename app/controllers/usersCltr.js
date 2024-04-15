const User = require('../models/user')
const role = require('../utils/role')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userCltr = {}

userCltr.register  = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body} = req
        const user = new User(body)
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        await user.save()
        res.status(201).json(user)
    } catch (err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

// userCltr.serviceProvider = async(req, res)=>{
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors : errors.array()})
//     }
//     try{
//         const {body} = req
//         const user = new User(body)
//         user.role = role.serviceProvider
//         const salt = await bcryptjs.genSalt()
//         const encryptedPassword = await bcryptjs.hash(user.password, salt)
//         user.password = encryptedPassword
//         await user.save()
//         res.status(201).json(user)
//     } catch(err){
//         console.log(err)
//         res.status(500).json({errors : 'Internal Server Error'})
//     }
// }

userCltr.login = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body} = req
        const user = await User.findOne({email : body.email})
        console.log(user)
        if(!user){
            return res.status(400).json({error : 'Invalid Email/Password'})
        }
        const checkPassword = await bcryptjs.compare(body.password, user.password)
        if(!checkPassword){
            return res.status(400).json({error : 'Invalid Email/Password'})
        }
        const tokenData = {
            id : user._id,
            role : user.role
        }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, {expiresIn : '7d'})
        res.json({token : token})
    } catch (err) {
        console.log(err)
        res.status(500).json({errors : errors.array()})
    }
}

userCltr.account = async (req, res) => {
    try{
        const user = await user.findById(req, user.id).select({password : 0})
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

userCltr.forgotPassword = async (req, res) => {
    
}

userCltr.updatePassword = async (req, res) => {

}

module.exports = userCltr