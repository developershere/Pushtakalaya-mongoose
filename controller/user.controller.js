import { validationResult } from "express-validator";
import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import { request, response } from "express";
import jwt from "jsonwebtoken";
import mail from "../service/email.js";
import env from 'dotenv';
import generateOTP from "../service/otpGenration.js";
env.config();
export const verifyEmail = async (request, response, next) => {
    try {
        console.log("fgsdgs");
        console.log(request.body.email);
        const flag = await User.findOne({ email: request.body.email });
        if (flag) {
            return response.status(400).json({ Message: "User is already exists...", status: false });
        }
        const x = Math.floor((Math.random() * 9999) + 1000);
        console.log(x);
        let data = await mail(request.body.email, "Email Verification from Pustakalaya", request.body.name, x);
        return true ? response.status(200).json({ result: { currentTime: new Date().getMinutes() + 5, OTP: x }, status: true }) : response.status(200).json({ Message: "Internal Server Error...", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ Message: "Internal Server Error...", status: false });
    }
}
export const signup = async (request, response, next) => {
    try {
        console.log("Signup called....");
        console.log(request.file.filename);
        const errors = await validationResult(request);
        if (!errors.isEmpty())
            return response.status(400).json({ message: "bed request ", masseges: errors.array() })
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(15));
        const register = await User.create({ name: request.body.name, email: request.body.email, contact: request.body.contact, password: request.body.password, photo: "Pustakalaya@" + request.file.filename, gender: "Male" });
        return response.status(200).json({ data: register, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ message: "Internal server Error", status: false });
    }
}


export const signIn = async (request, response, next) => {
    try {

        let user = await User.findOne({ email: request.body.email })
        console.log(request.body.password)
        let status = user?.email ? await bcrypt.compare(request.body.password, user.password) : false;
        console.log(status)
        if (status) {
            let token = jwt.sign({ email: user.email }, process.env.KEY_SECRET);
            return response.status(200).json({ user: { ...user.toObject(), password: null }, msg: "SignIn Success", status: true, token: token });
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
    try {
        const user = await User.findById(request.body._id);
        if (user) {
            user.name = request.body.name || user.name;
            user.email = request.body.email || user.email;
            user.photo = "Pustakalaya@" + request.file.filename || user.photo;
            const updatedUser = await user.save();
            return response.status(200).json({ updatedUser: updatedUser, staus: true });
        }
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error" });
    }
}


export const forgotPassword = async (request, response, next) => {
    try {
        const { email } = request.body;
        const user = await User.findOne({ email });
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
export const checkUser = async (request, response, next) => {
    
    try {
        console.log(request.body.email);
        const data = await User.findOne({ email: request.body.email });
        const OTP = await generateOTP();
        console.log(OTP);
        let email = await mail(request.body.email, "Forgott Password change related", data?.name, OTP);
        if (email)
            return response.status(200).json({ user: data, otp: OTP, status: true });
        return response.status(400).json({ Message: "User is unauthorized", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500), json({ message: 'Internal server error...', status: false });
    }
}
export const updatePassword = async (request, response, next) => {
    try {
        console.log(request.body);
        request.body.password = await bcrypt.hash(request.body.password, await bcrypt.genSalt(15));
        const user = await User.findOneAndUpdate({ email: request.body.email }, { password: request.body.password });
        console.log(user);
        if (user?.status)
            return response.status(200).json({ Message: 'Password Updated success', status: true });
        return response.status(400).json({ Message: 'Unauthorized User...', status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ Message: 'Internal Server Error...', status: false });
    }
}