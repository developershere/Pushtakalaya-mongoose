import { validationResult } from "express-validator";
import {Admin} from "../model/admin.model.js";
import bcrypt from "bcryptjs";

export const signUp=async(request,response,next)=>{
    try{
   !(validationResult(request))?response.status(400).json({err:"Bad Request",status:false}):request.body.password =await bcrypt.hash(request.body.password,await bcrypt.genSalt(13));
     return await Admin.create(request.body)?response.status(200).json({msg:"SignUp success"}):response.status(400).json({err:"Bad Request",status:false});
    }catch(err){
        console.log(err);
        return response.status(500).json({err:"Internal Server Error",status:false});
    }
}


export const signIn =async(request,response,next)=>{
    try{
    let user =await Admin.findOne({email:request.body.email});
    let status=user?await bcrypt.compare(request.body.password,user.password):response.status(401).json({msg:"Unauthorized person",status:false});
    status?response.status(200).json({user:{...user.toObject(),password:undefined},msg:"SignIn Success",status:true}):response.status(401).json({err:"Unauthorized Person",status:false});  
    }catch(err){
        return response.status(500).json({err:"Internal Server Error",status:false});
    }
}