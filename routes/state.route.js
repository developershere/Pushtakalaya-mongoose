import express from "express";
import {addState, findState} from "../controller/state.controller.js"

const router=express.Router();
router.post("/add-state",addState);
router.get("/findState", findState)

export default router;