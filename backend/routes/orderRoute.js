import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus, cancelOrder } from "../controllers/orderController.js"; // Import cancelOrder
const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get('/list', listOrders);
orderRouter.post('/status', updateStatus);
orderRouter.post('/cancel', authMiddleware, cancelOrder); // Add this route

export default orderRouter;
