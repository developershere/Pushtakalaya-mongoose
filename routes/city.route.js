import express from "express";
import {addCity} from "../controller/city.controller.js"

const router=express.Router();
router.post("/add-city",addCity);

export default router;