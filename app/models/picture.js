const mongoose=require("mongoose");
const schema=mongoose.Schema;

const picSchema=new schema({
    "picId":String,
    "Pic":String,
    "desc":String
})
module.exports=mongoose.model('Picture',picSchema)