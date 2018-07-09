const mongoose=require('mongoose');
const schema=mongoose.Schema

var tagsSchema=new schema({
    "name":String
})

module.exports=mongoose.model('Tag',tagsSchema)