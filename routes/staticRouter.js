const express = require('express');
const router=express.Router();
const URL=require('../models/url');

router.get('/',async(req,res)=>{
    if(!req.user){
        return res.redirect('/login');
    }
    const allurls=await URL.find({createdBy:req.user.id});
    return res.render('home',{urls:allurls});
}
);

router.get('/signup', (req, res) => {
    return res.render('signup'); // Ensure the signup view file exists
});

router.get('/login', (req, res) => {
    return res.render('login'); // Ensure the signup view file exists
});

module.exports=router;
// Express looks for templates in a directory named views in your project's root folder