let mongoose = require('mongoose');

let userroleSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    roleId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'role'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps:true
})

module.exports=
mongoose.model('userrole',userroleSchema)