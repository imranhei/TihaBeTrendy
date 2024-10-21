const express = require("express");
const router = express.Router();

const { getBusinessSummary } = require("../../controller/admin/business-summary-controller");
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.get("/business-summary", authMiddleware, isAdmin, getBusinessSummary);

module.exports = router;