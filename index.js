//Installing and setting up Mongoose:
let express=require('express');
const app=express();
let mongoose=require('mongoose');
const Person = require('./models/Person');

require('dotenv').config()


// Connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/MONGOOSE_CHECKPOINT', {useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>console.log('DATABASE IS CONNECTED'))
.catch(err=>console.log(err))

const PORT=process.env.PORT||6000
app.listen(PORT,(err)=>{
    if(err)throw err 
    console.log('server is running on port ')
})

//Create a person Create and Save a Record of a Model
let personModel=require('./models/Person')
let createPerson=new personModel({
    name:"khouloud",
    age:23,
    favoriteFoods:["chawarma","lablebi","lasagne"]
})
createPerson.save().then(file=>{console.log(file)})
.catch(err=>{console.error(err)});

//Create Many Records with model.create()

let arrayOfPeople=[
    {name:"hamadi Blagui" ,age: 26, favoriteFoods:["chawarma"]},
    {name:"sana Tounsi" ,age:28 , favoriteFoods:["kosksi"]},
    {name:"dhafer el abidine " ,age: 30 , favoriteFoods:["lablebi"]},
    {name:"amira Bejaoui" ,age:24 , favoriteFoods:["Tacos"]},
    {name:"slim Bechikh" ,age: 29, favoriteFoods:["libanais"]},
];
personModel.create(arrayOfPeople, async(err,data)=>{
    if(err){console.log(err)}
    await console.log(data)
})
// //Search by name Database
personModel.find({name:"hamadi Blagui"},(err,data)=>{
    if(err) throw (err)
    console.log(data)
})
//search by age 
personModel.find({age:23},(err,data)=>{
    if(err) throw (err)
    console.log(data)
})
//Use model.findOne() to Return a Single Matching Document from Your Database
personModel.findOne({favoriteFoods:'chawarma'},(err,data)=>{
    if(err)throw err
    console.log(data)
})

//Use model.findById() to Search Your Database By _id
let id= "62126721ad24d21edd1b696c"
personModel.findById({_id:id},(err,data)=>{
    if(err) throw err 
    console.log(data)
})
//Perform Classic Updates by Running Find, Edit, then Save
let id = "621266fd9f0e656ca473b727"
personModel.findByIdAndUpdate(
  {_id:id},
  {$push:{favoriteFoods:"Tacos"}},
  (err,res)=>{
if (err)throw err
res.save()
console.log(res)
})
// //Perform New Updates on a Document Using model.findOneAndUpdate()
personModel.findOneAndUpdate(
    {name:"hamadi Blagui"},
    {$set:{age:26}},
    {new :true},
    (err,res)=>{
  if (err)throw err
  res.save()
  console.log(res)
  })
  //Delete One Document Using model.findByIdAndRemove
  let id ="62126721ad24d21edd1b696a"
personModel.findByIdAndRemove(
  {_id:id},
  (err,data)=>{
if (err)throw err
console.log(data)
})
//MongoDB and Mongoose - Delete Many Documents with model.remove()
personModel.deleteMany({name:"dhafer el abidine"},(err,res)=>{
    if (err)throw err
    .done()
    console.log(res)
  })
  //Chain Search Query Helpers to Narrow Search Results
  personModel.find({favoriteFoods:"kosksi"})
.sort({name : "afe"})
.limit(2)
.select("-age")
.exec((err, data) => {
  if(err)
   throw (err);
 console.log(data);
})