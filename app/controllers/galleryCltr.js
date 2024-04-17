const Gallery = require('../models/gallery')
const {validationResult} = require('express-validator')
const galleryCltr = {}

galleryCltr.create = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const {body, files} = req
        const gallery = new Gallery(body)
        gallery.serviceProviderId = req.user.id
        gallery.galleryImg = files.galleryImg[0].path
        gallery.galleryVideo = files.galleryVideo[0].path
        await gallery.save()
        res.status(201).json(gallery)
    } catch(err){
        console.log(err)
        res.status(500).json({erros : 'Unable to upload the media file'})
    }
}

galleryCltr.list = async(req, res)=>{
    try{
        const gallery = await Gallery.find()
        res.json(gallery)
    }catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

galleryCltr.listOne = async(req, res)=>{
    try{
        const gallery = await Gallery.findOne({_id : id})
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

galleryCltr.update = async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
    try{
        const id = req.params.id
        const {body, files} = req
        let updateGallery = {...body} // spreading the body object to get all the existing fields
        if(files.galleryImg){
            updateGallery.galleryImg = files.galleryImg[0].path // assigning the path to gallery image
        }
        else if(files.galleryVideo){
            updateGallery.galleryVideo = files.galleryVideo[0].path // assigning the path to gallery image
        }else{
            updateGallery.galleryImg = body.galleryImg
            updateGallery.galleryVideo = body.galleryVideo
        }    
        const gallery = await Gallery.findOneAndUpdate({_id : id, serviceProviderId : req.user.id } , updateGallery , {new:true}) // updating the model with all the fields
        if(!gallery){        // returning user if unthorized/wrong id is given
            return res.status(404).json({error:'Image/Video not found'})
        }
        res.json(gallery)
    } catch(err){
        console.log(err)
        res.status(500).json({errors : 'Internal Server Error'})
    }
}

galleryCltr.delete = async(req, res)=>{
    try{
        const id = req.params.id
        const gallery = await Gallery.findOneAndDelete({_id: id, serviceProviderId: req.user.id})
        if(!gallery){
            return res.status(404).json({error:'Product not found/Unthorized'})
        }
        res.json(gallery)
    } catch(err){
        console.log(err)
        res.status(500).json({error : 'Internal Server Error'})
    }
}

module.exports = galleryCltr

