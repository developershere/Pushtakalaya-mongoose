import express from "express";
import{body }from "express-validator";

import { signup ,signIn,allUserList,userProfile,forgotPassword,updateProfile, verifyEmail} from "../controller/user.controller.js";

const router=express.Router();

router.post("/signIn",signIn)
router.post("/signup",signup);

router.get("/userList",allUserList)

router.post("/viewprofile" , userProfile );
router.put("/updateProfile",updateProfile);
router.post("/thakur",verifyEmail);

router.post('/forgot-password',forgotPassword);

export default router;