const express = require('express');
const router=express.Router();
const URL=require('../models/url');

router.get('/',async(req,res)=>{
    const allurls=await URL.find({});
    return res.render('home',{urls:allurls});
}
);

module.exports=router;
// Express looks for templates in a directory named views in your project's root folder