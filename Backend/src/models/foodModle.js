const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    foodPatner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'foodPatner',
    }
})

const food = mongoose.model('food',foodSchema);

module.exports = food;