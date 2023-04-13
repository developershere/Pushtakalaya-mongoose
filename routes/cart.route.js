import express from "express";
import {addToCart, fetchCart,removeBookInCart} from "../controller/cart.controller.js"

const router=express.Router();
router.post("/addToCart",addToCart);
router.post("/fetchCart",fetchCart)
router.post("/remove",removeBookInCart)

export default router;