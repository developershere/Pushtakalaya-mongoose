
import { validationResult } from "express-validator";
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { request, response } from "express";
import jwt from "jsonwebtoken";
import mail from '../services/email.js'
export const verifyEmail = async (request, response, next) => {
    try {
        console.log("Beckend called...");
        const flag = await User.findOne({ email: request.body.email });
        console.log(flag);
        if (flag)
            return response.status(200).json({ Message: "User is already exists...", status: false });
        const x = Math.floor((Math.random() * 9999) + 1000);
        console.log("Mausam...");
        return response.status(200).json({ result: { currentTime: new Date().getMinutes(), OTP: x }, status: true });
        // let data = await mail(request.body.email, "Email Verification from Pustakalaya", request.body.name, x);
        // return data ? response.status(200).json({ Message: "Internal Server Error...", status: false }):response.status(200).json({ result: { currentTime: new Date().getMinutes(), OTP: x }, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(200).json({ Message: "Internal Server Error...", status: false });
    }
}
// import env from '../env.json';
import nodemailer from 'nodemailer';
// import env from 'env';

export const signup = async (request, response, next) => {
    try {
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ message: "bed request ", masseges: errors.array() })
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(15));


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
    console.log("Sign In called...");
    console.log(request.body.email);
    console.log(request.body.password);

    try {
        let user = await User.findOne({ email: request.body.email })
        let status = user ? await bcrypt.compare(request.body.password,user.password): false;
        console.log(status);
        if (status) {
            let token = jwt.sign({ email: user?.email }, 'zxcvbnmasdfghjkl');
            return response.status(200).json({ user: { ...user.toObject(), password: undefined,token : token }, msg: "SignIn Success", status: true,});
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


export const userProfile = async (request, response, next) => {
    try {
        let user = await User.findById(request.body.id);
        user ? response.status(200).json({ Details: { ...user.toObject(), password: undefined }, status: true }) : response.status(400).json({ Message: "Bad request", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ Message: "Internal Server Error...", status: false });
    }
}

export const updateProfile = async (request, response, next) => {
    console.log(request.body);
    try {
        let update = await User.updateOne({ _id: request.body.id }, { email: request.body.email, name: request.body.name, contact: request.body.contact })
        return response.status(200).json({ message: "profile update", result: update, status: true });

    }
    catch (err) {
        return response.staus(500).json({ error: "Internal server error" });
    }
}

export const forgotPassword = async (request,response,next)=>{
  try {
    const { email } = request.body;
    const user = await User.findOne({ email });
    console.log(email);
    console.log(user);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    await user.save();
    response.json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Server error' });
  }
};




