const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    joined:{
        type:String,
        // required:true

    },
    joinData:{
        type:Date,
        required:true,
        default:Date.now

    }

})

module.exports = mongoose.model('User', userSchema)