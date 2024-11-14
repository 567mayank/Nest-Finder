import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
  userName : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    lowercase : true,
    trim : true 
  },
  password : {
    type : String,
    required : true
  },
  fullName : {
    type : String,
    required : true
  },
  listedProperty : [{
    type : Schema.Types.ObjectId,
    ref : "Property"
  }]
})

userSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next();

  this.password = bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName
    },
    process.env.ACCESS_TOKEN_SECRET
  ) 
}



const User = mongoose.model("User",userSchema)
export default User