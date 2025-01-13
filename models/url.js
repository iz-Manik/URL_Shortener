const mongoose = require('mongoose');
const { redirect } = require('react-router-dom');
const Schema = new mongoose.Schema({
    shortID: {
        type:String,
        required:true,
        unique:true
    },
    redirectURL:{
        type:String,
        required:true
    },
    clickCount:{
        type:Number,
        required:true,
        default:0
    },
    visitHistory:[{ timestamp :{ type:number} }],
},
    {timestamps:true}
);

const URL = mongoose.model('URL',Schema);
module.exports = URL;