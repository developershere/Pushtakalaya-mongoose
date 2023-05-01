import mongoose from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
import { boolean } from "webidl-conversions";

const userSchema =new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique : true
    },
    password: {
        type:String,
        required:true,
        unique : true
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
userSchema.plugin(uniqueValidator);
export const User = mongoose.model("user",userSchema);