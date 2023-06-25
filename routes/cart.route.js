import express from "express";
import {addToCart, fetchCart,removeBookInCart,userCart} from "../controller/cart.controller.js"
import {verifyToken} from '../verification/tokenVerification.js';
const router=express.Router();
router.post("/addToCart",verifyToken,addToCart);
router.post("/fetchCart",verifyToken,fetchCart);
router.post("/remove",verifyToken,removeBookInCart);
// router.post("/userCart",userCart);
export default router;