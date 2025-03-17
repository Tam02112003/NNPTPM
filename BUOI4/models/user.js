let mongoose = require("mongoose");
let bcrypt = require('bcrypt')
let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      default: '',
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    status: {
      type: Boolean,
      default: "false",
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    },
    loginCount:{
        type: Number,
        default: 0,
        min: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true,
  }
);
userSchema.pre('save',function(next){
  if(this.isModified('password')){
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
  }
  next();
})

module.exports = mongoose.model("user", userSchema);