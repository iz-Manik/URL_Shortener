const mongoose = require('mongoose');
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
    visitHistory:[{ timestamp :{ type:Number} }],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
},
    {timestamps:true}
);

const URL = mongoose.model('URL',Schema);
module.exports = URL;