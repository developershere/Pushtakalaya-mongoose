import mongoose from "mongoose";
import { boolean } from "webidl-conversions";

const userSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
    contact: {
        type: Number,
        required:true,
    },
    photo: {
        type: String
  
    },
    status: {
        type:Boolean,
        default:true
    }
})

export const User = mongoose.model("user",userSchema);