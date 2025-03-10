let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    userName:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
   
},{
    timestamps:true
})

module.exports=
mongoose.model('user',userSchema)