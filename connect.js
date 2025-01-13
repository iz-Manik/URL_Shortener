const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/urlShortner',);
        console.log('Connected to MongoDB');
    }catch(err){
        console.error('Error connecting to MongoDB');
        console.error(err);
    }
}

module.exports=connect;