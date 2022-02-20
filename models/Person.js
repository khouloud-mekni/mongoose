//initializing person prototype with a Schema
const mongoose=require('mongoose')
const personSchema=new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods:[String],
    required: Boolean,

})
module.exports=Person=mongoose.model("person",personSchema)