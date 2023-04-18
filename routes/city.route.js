import express from "express";
import { addCity, findCityByState } from "../controller/city.controller.js"

const router = express.Router();
router.post("/add-city", addCity);
router.get("/cityByState", findCityByState);

export default router;