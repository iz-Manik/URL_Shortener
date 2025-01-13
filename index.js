const express=require('express');
const app=express();

const Port=8001;

app.listen(Port,()=>{
    console.log(`Server is running on ${Port}`);
});