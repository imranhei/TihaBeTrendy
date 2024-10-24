const express = require("express");
const router = express.Router();

const {
  getAllSales,
  updateSale,
  deleteSale,
} = require("../../controller/admin/sales-controller");
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.get("/get-all-sales", authMiddleware, isAdmin, getAllSales);
router.put("/update-sale/:id", authMiddleware, isAdmin, updateSale);
router.delete("/delete-sale/:id", authMiddleware, isAdmin, deleteSale);

module.exports = router;