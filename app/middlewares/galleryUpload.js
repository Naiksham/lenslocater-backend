const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        if(file.mimetype.startsWith('image')){
            cb(null, './app/files/images')
        }else if(file.mimetype.startsWith('video')){
            cb(null, './app/files/videos')
        }else{
            cb(new Error('invalid file type'))
        }
    },
    filename:(req , file , cb)=>{
        cb(null , `${Date.now()}-${file.originalname}`)
    }
}) 

const upload = multer({
    storage:storage
})

module.exports = upload

