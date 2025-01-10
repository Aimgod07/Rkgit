import mongoose from "mongoose";
import validator from "validator";  

const messageSchema = new mongoose.Schema({
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
        minlength: [10, "Message must be at least 10 characters long"],
        maxlength: [100, "Message must be at most 100 characters long"],
    },  
 
});

export const Message = mongoose.model("Message", messageSchema);

