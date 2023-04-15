import express from "express"
import { saveOrder, vieworderHistoryByUserId, vieworderList,changestatus,vieworderByorderId } from "../controller/order.controller.js";

const router = express.Router();
router.post("/saveorder",saveOrder);
router.get("/vieworder", vieworderList)
router.post("/vieworderByorderId",vieworderByorderId)
router.get("/vieworderByuserId/:userId", vieworderHistoryByUserId);
router.put("/changestatus",changestatus);

export default router;