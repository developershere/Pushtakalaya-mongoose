import express from "express";
import {addState} from "../controller/state.controller.js"

const router=express.Router();
router.post("/add-state",addState);

export default router;