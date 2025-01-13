const {shortid}=require('shortid');
const URL=require('../models/url');


async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:'URL is required'});
    }
    const shortID=shortid(8);
    await URL.create({shortID,redirectURL:req.body.url,visitedHistory:[]});
    res.json({id:shortID});
}
module.exports={handleGenerateNewShortURL};