import express from "express";
import {addCity,cityList,findCityByState} from "../controller/city.controller.js"

const router=express.Router();
router.post("/add-city",addCity);
router.get("/list",cityList)
router.post("/cityByState", findCityByState);

export default router;