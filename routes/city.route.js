import express from "express";

import {addCity,cityData,cityList,findCityByState} from "../controller/city.controller.js"

const router=express.Router();
router.post("/add-city",addCity);
router.get("/findCity",cityList)
router.post("/byid",cityData)

router.post("/findCityByState", findCityByState);

export default router;