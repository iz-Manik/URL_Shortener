const shortid = require('shortid');

const URL=require('../models/url');


async function handleGenerateNewShortURL(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({error:'URL is required'});
    }
    const short=shortid.generate();
    await URL.create({shortID:short,redirectURL:req.body.url,visitedHistory:[]});
    res.json({id:short});
}


async function handleGetAnalytics(req,res){
    const shortID=req.params.shortID;
    const url=await URL.findOne({shortID});
    if(!url){
        return res.status(404).json({error:'URL not found'});
    }
    res.json({clickCount:url.visitHistory.length,analytics:url.visitHistory});
}

module.exports={handleGenerateNewShortURL,handleGetAnalytics};