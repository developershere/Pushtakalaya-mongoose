import express from "express";
import { addState,stateList } from "../controller/state.controller.js"

const router = express.Router();
router.post("/add-state", addState);
router.get("/stateList",stateList);



export default router;