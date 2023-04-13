import express from "express"
import { saveOrder, vieworderHistoryByUserId, vieworderList,changestatus } from "../controller/order.controller.js";

const router = express.Router();
router.post("/saveorder",saveOrder);
router.get("/vieworder", vieworderList)
router.get("/vieworderByuserId/:userId", vieworderHistoryByUserId);
router.post("/changestatus",changestatus);




export default router;