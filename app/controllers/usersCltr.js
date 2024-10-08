const User = require('../models/user')
const role = require('../utils/role')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const usersCltr = {}
usersCltr.listServiceProviders = async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.json(serviceProviders);
    } catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal Server Error' });
    }
};

usersCltr.register = async(req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body} = req
        const user = new User(body)
        const count = await User.find().countDocuments()
        // console.log(count)
        if(count==0){
            user.role === role.admin
        } else{
            user.role === role.customer || user.role === role.serviceProvider
        }
        const salt = await bcryptjs.genSalt()
        const encryptedPassword = await bcryptjs.hash(user.password, salt)
        user.password = encryptedPassword
        await user.save()
        res.status(201).json(user)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Interanl Server Error'})
    }
}

usersCltr.login = async (req, res) => {
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

usersCltr.account = async (req, res) => {
    try{
        const user = await User.findById(req.user.id).select({password : 0})
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

module.exports = usersCltr