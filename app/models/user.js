'use strict'
const mongoose=require("mongoose");
const schema=mongoose.Schema

const userSchema=new schema({
    "userId":String,
    "account":String,
    "password":String,
    "loginTime":{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model('User',userSchema)