const mongoose=require("mongoose");
const schema=mongoose.Schema;

const picSchema=new schema({
    "picId":String,
    "Logo":String,
    "desc":String
})
module.exports=mongoose.model('Picture',picSchema)