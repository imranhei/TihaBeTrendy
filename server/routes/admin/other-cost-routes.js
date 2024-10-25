const express = require("express");
const router = express.Router();

const {
  addOtherCost,
  getAllOtherCosts,
  updateOtherCost,
  deleteOtherCost,
} = require("../../controller/admin/other-cost-controller");
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.post("/add-other-cost", authMiddleware, isAdmin, addOtherCost);
router.get("/get-all-other-costs", authMiddleware, isAdmin, getAllOtherCosts);
router.put("/update-other-cost/:id", authMiddleware, isAdmin, updateOtherCost);
router.delete("/delete-other-cost/:id", authMiddleware, isAdmin, deleteOtherCost);

module.exports = router;