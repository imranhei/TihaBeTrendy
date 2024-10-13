const express = require("express");
const router = express.Router();

const {
  addOrder,
  getAllOrders,
  updateOrder,
  deleteOrder
} = require("../../controller/admin/order-controller");

router.post("/add-order", addOrder);
router.get("/get-all-orders", getAllOrders);
router.put("/update-order/:id", updateOrder);
router.delete("/delete-order/:id", deleteOrder);

module.exports = router;
