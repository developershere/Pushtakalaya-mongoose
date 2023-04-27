import express from "express";
import{body }from "express-validator";
import { signup ,signIn,allUserList,userProfile,updateProfile, verifyEmail} from "../controller/user.controller.js";
const router=express.Router();

router.post("/signup",body("name","Name Must Be Required").notEmpty(),
body("password","password Must Be Required").notEmpty(),
body("contact","contact Must Be Required").notEmpty(),
body("email","Email Must be Required"),body("email","please Enter correct email"),signup);

router.post("/signIn",signIn)
router.get("/userList",allUserList)
router.post("/viewprofile" , userProfile );
router.put("/updateProfile",updateProfile);
router.post("/mausam",verifyEmail);

export default router;