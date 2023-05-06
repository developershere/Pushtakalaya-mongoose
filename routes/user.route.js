import express from "express";
import{body }from "express-validator";

import { signup ,signIn,allUserList,userProfile,forgotPassword,updateProfile, verifyEmail} from "../controller/user.controller.js";

const router=express.Router();

router.post("/signIn",signIn)
router.post("/signup",signup);

router.get("/userList",allUserList)

router.post("/viewprofile" , userProfile );
router.post("/updateProfile",updateProfile);
router.get("/verifyEmail",verifyEmail);
router.post('/forgot-password',forgotPassword);

export default router;

// completed