const express=require('express');
const app=express();
const urlRouter=require('./routes/url');
const Port=8001;
const connect=require('./connect');

connect();


app.use("/url",urlRouter);

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});