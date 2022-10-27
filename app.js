// Task1: initiate app and run server at 3000
const express=require('express');
const app= express();
const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
app.use(express.json())//text related
app.use(express.urlencoded({extended:true}))
// Task2: create mongoDB connection 
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Shijina:Shijina25@cluster0.bt2utkb.mongodb.net/casestudy2?retryWrites=true&w=majority')
.then(()=>{
    console.log("server is connected!!!!!")
})
.catch(error =>{
    console.log('connection error'+error)
})
const EMPLOYEE=require('./model/employee');
const { findByIdAndUpdate } = require('./model/employee');
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below








//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', (req,res)=>{
    EMPLOYEE.find().then((data)=>{
        res.send(data)
    })
})

//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id',(req,res)=>{
    EMPLOYEE.findOne({"_id":req.params.id}).then((data)=>{
        res.send(data)
    })
})

//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist',async(req,res)=>{
   try {
    const item=req.body;
    const user= EMPLOYEE(item);
    const savedUser=await user.save();
    console.log('savedUser',savedUser);
    res.send()
   } catch (error) {
    console.log(error)
   }
})


//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id',async (req,res)=>{
   let id=req.params.id
   try {
    const result=await EMPLOYEE.findOneAndDelete(id)
    res.send(result);
   } catch (error) {
    console.log(error)
   }
})



//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.put('/api/employeelist',async (req,res)=>{
    try {
        const data=await EMPLOYEE.findByIdAndUpdate({"_id":req.body._id},{$set:{
            "name":req.body.name,
            "location":req.body.location,
            "position":req.body.position,
             "salary":req.body.salary
        }})
        console.log("updated data")
        res.send(data)
    }
    catch(error){
        console.log("error",error)
    }
    })

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});

const PORT=process.env.PORT || 3000
app.listen(3000,()=>{
    console.log(`server is connected to port ${PORT}`);
})


