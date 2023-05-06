import express from "express"
import { saveOrder, vieworderHistoryByUserId, vieworderList,changestatus,vieworderByorderId,viewOrderBySellerId } from "../controller/order.controller.js";

const router = express.Router();
router.post("/saveorder",saveOrder);
router.get("/vieworder", vieworderList)
router.post("/vieworderByorderId",vieworderByorderId)
router.post("/vieworderByuserId", vieworderHistoryByUserId);
router.put("/changestatus",changestatus);
router.post("/viewproductBySellerId",viewOrderBySellerId)

export default router;