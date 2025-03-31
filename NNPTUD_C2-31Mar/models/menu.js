let mongoose = require('mongoose');
const { boolean } = require('webidl-conversions');
let menuSchema = mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true,
        default:"/"
    },
    parent:{
        type:mongoose.Types.ObjectId,
        ref:"menu"
    }

},{
    timestamps:true
})
module.exports=
mongoose.model('menu',menuSchema)