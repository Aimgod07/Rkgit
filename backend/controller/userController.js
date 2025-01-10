import { catchAsyncErrors } from "../middlewares/catchingAsyncerrors.js";
import errorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken} from "../utils/jwtTokens.js";
import cloudinary from "cloudinary";

export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,password,gender,dob,address,phone,nic,message,role}=req.body;
    if(!firstName || !lastName || !email || !password || !gender || !dob  || !phone || !nic)
        {
        return next(new errorHandler("All fields are required",400));
    }
    let user=await User.findOne({email});
    if(user){
        return next(new errorHandler("User already exists",400));
    }
     user=await User.create({
        firstName,
        lastName,
        email,
        password,
        gender,
        dob,
        phone,
        nic,
        role,
        message,
    });
    generateToken(user,"user registered",200,res)
    
}) ;     

export const login = catchAsyncErrors(async(req,res,next)=>{
    const {email,password,confirmPassword,role}=req.body;
    if(!email || !password || !confirmPassword || !role){
        return next(new errorHandler("All fields are required",400));
    }
    if(password !== confirmPassword){
        return next(new errorHandler("Password and confirm password do not match",400));
    }
    
    const user=await User.findOne({email}).select("+password")

    if(!user){
        return next(new errorHandler("invalid password",400));
    }

    const isPasswordMatched=await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new errorHandler("Invalid password",400));
    }   
    if(role!==user.role){
        return next(new errorHandler("User with the role not found",400));
    }   
    
    generateToken(user,"user login succesfully",200,res)
});

export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,password,gender,dob,address,phone,nic,message }=req.body;
    if(!firstName || !lastName || !email || !password || !gender || !dob || !address || !phone || !nic)
        {
        return next(new errorHandler("All fields are required",400));
        }
const isRegistered=await User.findOne({email});
if(isRegistered){
    return next(new errorHandler(`${isRegistered.role} with this email is already present`));
}
const admin=await User.create({
    firstName,
    lastName,
    email,
    password,
    gender,
    dob,
    address,
    phone,
    nic,
    message,
    role:"admin",    
});
res.status(200).json({
    success:true,
    message:"New Admin Registered",
});
})

export const getALLDoctors=catchAsyncErrors(async(req,res,next)=>{
    const doctors=await User.find({role:"Doctor"});
    res.status(200).json({
        success:true,
        doctors,
    })
})

export const getUserDetails =catchAsyncErrors(async(req,res,next)=>{const user=req.user;    
    res.status(200).json({
        success:true,
        user,
    })
})

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("admintoken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Logged out successfully",
    })
})  

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now()),
    }).json({
        success:true,
        message:"Logged out successfully",
    })
})  

export const addNewDoctor=catchAsyncErrors(async(req,res,next)=>{
    if(!req.files || Object.keys(req.files).length===0){
        return next(new errorHandler("Please upload a profile picture",400));
    }
  const {docAvatar}=req.files;
const allowedfor =["image/jpg","image/jpeg","image/png"];
if(!allowedfor.includes(docAvatar.mimetype)){
    return next(new errorHandler("Please upload a valid image",400));
}   const {firstName,lastName,email,password,gender,dob,address,phone,nic,message,doctorDepartment }=req.body;   

if(!firstName || !lastName || !email || !password || !gender || !dob || !address || !phone || !nic || !doctorDepartment){
    return next(new errorHandler("All fields are required",400));
}   
const isRegistered=await User.findOne({email});
if(isRegistered){
    return next(new errorHandler(`${isRegistered.role} with this email is already present`));
}

const cloudinaryResponse=await cloudinary.uploader.upload(docAvatar.tempFilePath);  
if(!cloudinaryResponse ||cloudinaryResponse.error){
    console.log("cloudinary error" ,cloudinaryResponse.error);
    return next(new errorHandler("Failed to upload image",400));
}
const doctor =await User.create({
    firstName,
    lastName,
    email,
   password,
    gender,
    dob,
    address,
    phone,
    nic,
    message,
    role:"Doctor",
   docAvatar:{
    public_id:cloudinaryResponse.public_id,
    url:cloudinaryResponse.secure_url,
   },
})
res.status(200).json({
    success:true,
    message:  "New Doctor Added",
    doctor,
})  
})