const express = require("express");
const app = express();
const mongoose = require("mongoose");
const user = require('./models/users');
var bodyParser = require("body-parser");
var jsonParsor = bodyParser.json(); 
var crypto = require ('crypto');
var key ="password";
var algo ="aes256";
const jwt = require("jsonwebtoken");
jwtkey="jwt";

mongoose.connect('mongodb+srv://new_user:dYzgb7ZDO3BPFsZU@cluster0.4swmy.mongodb.net/jwtdb?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected");
})

app.post('/register',jsonParsor,(req,res)=>{
    var cipher = crypto.createCipher(algo,key);
    var encrypted= cipher.update(req.body.password,'utf-8','hex')
    +cipher.final('hex');
    console.log(encrypted);
    
    console.log(req.body);
    
    const data = new user({
        _id:mongoose.Types.ObjectId(),
    name:req.body.name,
    email:req.body.email,
    address:req.body.address,
    password:encrypted
    });
    data.save().then((result)=>{
        jwt.sign({result},jwtkey,{expiresIn:'3000s'},(err,token)=>{
            res.status(201).json({token})
        })
        // res.status(200).json(result);
    }).catch((err)=>{
        console.log(err);
    });
    // res.send("hello");
} )

app.get("/",(req,res)=>{
    res.end("hello");



})
app.listen(4000,()=>{
    console.log("server at 4000");
})