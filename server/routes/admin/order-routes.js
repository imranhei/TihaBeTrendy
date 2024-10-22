const express = require("express");
const router = express.Router();

const {
  addOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../../controller/admin/order-controller");
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.post("/add-order", authMiddleware, isAdmin, addOrder);
router.get("/get-all-orders", authMiddleware, isAdmin, getAllOrders);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrder);
router.delete("/delete-order/:id", authMiddleware, isAdmin, deleteOrder);

module.exports = router;
