import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken"; 
import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  firstName: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters long"],
      maxlength: [30, "First name must be at most 30 characters long"],
  },
  lastName: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters long"],
      maxlength: [30, "Last name must be at most 30 characters long"],    
  },  
  email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
  },  
  phone: {
      type: String,
      required: true,
      unique: true,
      minlength: [10, "Phone number must be at least 10 characters long"],
      maxlength: [10, "Phone number must be at most 10 characters long"],     
      validate: [validator.isMobilePhone, "Please enter a valid phone number"],
  },  
  message: {
      type: String,
      required: true,
  },  

  nic:{
    type:String,
    required: true,
  },
  gender:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    select:false,
  },
  role:{
    type:String,
    required:true,
    enum:["admin","patient","doctor"]
  },

  dcotorDepartment:{
    type:String
  },

  docAvatar:{
    public_id:String,
    url:String,
  },




});


userSchema.pre("save",async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    this.password=await bcrypt.hash(this.password, 10);
    
});

userSchema.methods.comparePassword=async function enteredPassword(enteredPassword) {return await bcrypt.compare(enteredPassword,this.password);
    
}

userSchema.methods.generateJsonWebToken = function () {
    return jwt.sign({id:this._id}, process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRES,
    });
};


export const User = mongoose.model("User", userSchema);


