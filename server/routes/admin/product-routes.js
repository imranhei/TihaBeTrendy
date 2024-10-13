const express = require("express");
const router = express.Router();

const {
  handleImageUpload,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../../controller/admin/product-controller");
const { upload } = require("../../helper/cloudinary");

router.post("/upload-image", upload.single("image"), handleImageUpload);
router.post("/add-product", addProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-product-by-id/:id", getProductById);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

module.exports = router; 
