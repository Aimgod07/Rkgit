import mongoose from "mongoose";
import validator from "validator";

const appointmentSchema=new mongoose.Schema({
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
   dob:{
    type:Date,
    required:true,
   },
   appointmentDate:{
    type:Date,
    required:true,
   },   
   department:{
    type:String,
    required:true,
   },
   doctor:{
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
   },
   hasVisited:{
    type:Boolean,
    default:false,
   },   
   doctorId:{
    type:mongoose.Schema.ObjectId,
    required:true,
   },
   patientId:{
    type:mongoose.Schema.ObjectId,
    required:true,
   },
   address:{
    type:String,
    required:true,
   },
   status:{
    type:String,
    required:true,
    enum:["pending","approved","rejected"],
    default:"pending",
   },   
})  

export const Appointment=mongoose.model("Appointment",appointmentSchema);

