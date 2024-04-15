const mongoose = require('mongoose')

const ConfigureDB = async () => {
    try{
        const db = await mongoose.connect('mongodb://127.0.0.1:27017/lens-locater-app')
        console.log('Successfully Connected to DB')
    } catch(err){
        console.log('Error Connecting to DB', err)
    }
}

module.exports = ConfigureDB