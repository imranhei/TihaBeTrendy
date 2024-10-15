const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
} = require("../../controller/user/product-controller");

router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);

module.exports = router;