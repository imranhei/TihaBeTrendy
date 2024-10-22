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
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.post("/upload-image", authMiddleware, isAdmin, upload.single("image"), handleImageUpload);
router.post("/add-product", authMiddleware, isAdmin, addProduct);
router.get("/get-all-products", authMiddleware, isAdmin, getAllProducts);
router.get("/get-product-by-id/:id", authMiddleware, isAdmin, getProductById);
router.put("/update-product/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/delete-product/:id", authMiddleware, isAdmin, deleteProduct);

module.exports = router; 
