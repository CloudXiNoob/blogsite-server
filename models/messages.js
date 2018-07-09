const mongoose=require("mongoose");
const schema=mongoose.Schema

const messageSchema=new schema({
    "messageId":String,
    "name":String,
    "email":String,
    "content":String,
    "createDate":String
})

module.exports=mongoose.model('Message',messageSchema)