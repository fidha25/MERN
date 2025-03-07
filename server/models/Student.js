const mongoose=require('mongoose');

const StudentSchema= mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true, 
    },
    address:{
        type:String,
        required:true
    }
})
module.exports= mongoose.model('Student',StudentSchema)