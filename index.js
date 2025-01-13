const express=require('express');
const app=express();
const urlRouter=require('./routes/url');
const Port=8001;
const connect=require('./connect');
const URL=require('./models/url');
connect();

app.use(express.json());
app.use("/url",urlRouter);

app.get('/:shortID',async (req,res)=>{
    const shortID=req.params.shortID;
    const url=await URL.findOneAndUpdate(
        { shortID },
        { $push: { visitHistory: { timestamp: Date.now() } } },
    )

    res.redirect(url.redirectURL);
});


app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});