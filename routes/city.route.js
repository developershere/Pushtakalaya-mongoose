import express from "express";
import {addCity,cityList} from "../controller/city.controller.js"

const router=express.Router();
router.post("/add-city",addCity);
router.get("/findCity",cityList)

export default router;