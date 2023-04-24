import express from "express";
import {addCity,cityList} from "../controller/city.controller.js"

const router=express.Router();
router.post("/add-city",addCity);
router.get("/list",cityList)

export default router;