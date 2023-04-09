import express from "express";
import {addToCart} from "../controller/cart.controller.js"

const router=express.Router();
router.post("/addToCart",addToCart);

export default router;