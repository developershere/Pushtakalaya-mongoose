import express from "express";
import {addCategory,editCategory,list,removeCategory}from "../controller/category.controller.js"
const router = express.Router();
router.post("/addCategory",addCategory);
router.get("/list",list);
router.get("/remove/:id",removeCategory);
router.post("/edit",editCategory )
export default router;