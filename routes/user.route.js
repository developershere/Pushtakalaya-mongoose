import express from "express";
import{body }from "express-validator";
import multer from "multer";
import { signup, signIn, allUserList, userProfile, forgotPassword, updateProfile, verifyEmail, checkUser, updatePassword } from "../controller/user.controller.js";
// import { invoice } from "../services/invoice.js";
import { PDF } from "../services/nodeInvoice.js";
import {verifyToken} from '../verification/tokenVerification.js';
const upload = multer({dest:"public/images"});
const router=express.Router();
router.post("/signIn",signIn);
router.post("/signup",signup);
router.get("/userList",allUserList)
router.post("/viewprofile",userProfile );
router.post("/updateProfile",upload.single("profile"),updateProfile);
router.post("/verifyEmail",verifyEmail);
router.post('/forgot-password',forgotPassword);
router.post('/forgettpassword', updatePassword);
router.post('/checkuser',checkUser);
// router.post('/invoice',PDF);
export default router;