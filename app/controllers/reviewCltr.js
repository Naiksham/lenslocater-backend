const Review = require('../models/reviews')
const {validationResult} = require('express-validator')
const reviewsCltr = {}
const ratingCltr = {}

reviewsCltr.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body} = req
        const reviews = new Review(body)
        enquiry.customerId = req.user.id
        enquiry.serviceProviderId = id
        await reviews.save()
        res.status(201).json(reviews)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

reviewsCltr.list = async(req, res)=>{
    try{
        const reviews = await Review.find()
        res.status(reviews)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

ratingCltr.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body} = req
        const reviews = await new Review(body)
        enquiry.customerId = req.user.id
        enquiry.serviceProviderId = id
        reviews.save()
        res.status(201).json(reviews)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

ratingCltr.list = async(req, res)=>{
    try{
        const ratings = await Review.find()
        res.status(ratings)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

module.exports = {
    reviewsCltr,
    ratingCltr
}