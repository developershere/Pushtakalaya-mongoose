import express from "express";
import {addToCart, fetchCart} from "../controller/cart.controller.js"

const router=express.Router();
router.post("/addToCart",addToCart);
router.post("/fetchCart",fetchCart)

export default router;