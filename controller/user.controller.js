
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
            if (request.body.otp == x) {
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
        let status = user ? bcrypt.compare(request.body.password, user.password) : response.status(404).json({ err: "unauthorized person" });
        if(status){
            let token=jwt.sign({email:user.email},'zxcvbnmasdfghjkl');
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
