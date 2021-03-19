const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require('./models/users'); 
mongoose.connect('mongodb+srv://new_user:dYzgb7ZDO3BPFsZU@cluster0.4swmy.mongodb.net/jwtdb?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected");
})


app.get("/",(req,res)=>{
    res.end("hello");



})
app.listen(3000,()=>{
    console.log("server at 3000");
})