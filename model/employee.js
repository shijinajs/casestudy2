const mongoose=require('mongoose');
const schema=mongoose.Schema;
const Employee=new schema({
    name:String,
    location:String,
    position:String,
    salary:Number
})
const EMPLOYEE=mongoose.model('employee',Employee);
module.exports=EMPLOYEE;


