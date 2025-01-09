const mongoose= require('mongoose');

const menuItem = mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        required:true,
    }
});

const menu = mongoose.model('menu',menuItem)

module.exports = menu;