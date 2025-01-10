import mongoose from "mongoose";

export const dbConnection=async()=>{
    mongoose.connect(process.env.MONGO_URL,{
          }).then(()=>{
        console.log("Connected to Database");
    })
    .catch((err)=>{
        console.log(err);
    })  
}
