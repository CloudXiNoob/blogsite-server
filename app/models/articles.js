const mongoose =require('mongoose');
const schema=mongoose.Schema

var article=new schema({
    "title":String,
    "tag":String,
    "desc":String,
    "createTime":{
        type:Date,
        default:Date.now()
    },
    "lastEditTime":{
        type:Date,
        default:Date.now,
    },
    "content":String
},{versionKey:false});
module.exports=mongoose.model('Article',article)