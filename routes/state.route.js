import express from "express";
import {addState,list} from "../controller/state.controller.js"

const router=express.Router();
router.post("/add-state",addState);
router.get("/list",list);

export default router;