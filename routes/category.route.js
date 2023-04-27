import express from "express";
import {addCategory,editCategory,list,removeCategory}from "../controller/category.controller.js"
const router = express.Router();
router.post("/addCategory",addCategory);
router.get("/list",list);
router.post("/remove",removeCategory);
router.put("/edit",editCategory )
export default router;