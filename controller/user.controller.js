
import { validationResult } from "express-validator";
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { request, response } from "express";
import jwt from "jsonwebtoken";
import mail from '../service/email.js'

export const signup = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ message: "bed request ", masseges: errors.array() })
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(15));

        let x = Math.floor((Math.random() * 9999) + 1000);
        let email=mail(request.body.email,"Registration Verification ",request.body.name,x)
        var time = new Date().getMinutes();
        if (new Date().getMinutes() <= time + 5) {
            if (request.body.otp == 470115) {
                const user = await User.create(request.body);
                return response.status(200).json({ user: user, status: true });
            }
            return response.status(400).json({ message: "OTP is mismetched...", status: false });
        }

        return response.status(400).json({ message: "OTP is Expires", status: false });
    }
    catch (err) {

        return response.status(500).json({ message: "Internal server Error", status: false });
    }
}


export const signIn = async (request, response, next) => {
    try {
  
        let user = await User.findOne({ email: request.body.email })
       
        let status =user ?await bcrypt.compare(request.body.password, user.password) : response.status(404).json({ err: "unauthorized person" });
        if(status){
            let payload = {subject: user.email};
            let token=jwt.sign(payload,'zxcvbnmasdfghjkl');
            return response.status(200).json({user:{...user.toObject(),password:undefined},msg:"SignIn Success",status:true,token:token});
        } 
        return response.status(404).json({ err: "unauthorized person" })

    } catch (err) {
        console.log(err);
        return response.status(200).json({ err: "Internal Server Error", status: false });
    }
}



export const allUserList = (request, response, next) => {
    User.find().then(result => {
        return response.status(200).json({ msg: "All User List", user: result, status: true });
    }).catch(err => {
        return response.status(500).json({ err: "Internal Server Error", status: false });
    })
}


export const userProfile = async (request,response,next)=>{
    try {
        let user = await User.findById( request.body.id);
        user ? response.status(200).json({ Details: { ...user.toObject(), password: undefined }, status: true })  :  response.status(400).json({ Message: "Bad request", status: false });
      }
       catch (err) {
           console.log(err);
           return response.status(500).json({ Message: "Internal Server Error...", status: false });
       }
   }

export const updateProfile = async (request,response,next)=>{
  console.log(request.body);
  try{
   let update = await User.updateOne({_id : request.body.id } ,{email : request.body.email, name : request.body.name, contact : request.body.contact})
   return response.status(200).json({message : "profile update" , result : update,status:true});
     
  }
  catch(err){
   return response.staus(500).json({error : "Internal server error"});
}  
}

export const updateProfile = async (req,response,next)=>{
    
   
    try{
    const user = await User.findById(req.body._id);
    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.photo = req.body.photo || user.photo;
       
        const updatedUser = await user.save();
        return response.status(200).json({updatedUser:updatedUser,staus:true});
    }
}
    catch(err){
        console.log(err);
     return response.status(500).json({error : "Internal server error"});
    }
 }
