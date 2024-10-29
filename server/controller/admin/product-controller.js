const { imageUploadUtil } = require("../../helper/cloudinary");
const cloudinary = require("cloudinary").v2;
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url, "tiha");

    res.status(200).json({ success: true, result });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add product",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const {
      category = "",
      sortBy = "price-lowtohigh",
      search = "",
    } = req.query;
    let filters = {};

    if (category) {
      filters.category = { $in: category.split(",") };
    }

    if (search) {
      filters.$or = [
        { productId: { $regex: search, $options: "i" } },
        { title: { $regex: search, $options: "i" } },
      ];
    }

    let sort = {};
    switch (sortBy) {
      case "price-lowtohigh":
        sort = { price: 1 };
        break;
      case "price-hightolow":
        sort = { price: -1 };
        break;
      case "title-atoz":
        sort = { title: 1 };
        break;
      case "title-ztoa":
        sort = { title: -1 };
        break;
      default:
        sort = { price: 1 };
        break;
    }

    const products = await Product.find(filters).sort(sort);

    res.status(201).json({ success: true, data: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      image,
      productId,
      title,
      category,
      price,
      unitPurchaseCost,
      totalPurchaseCost,
      stock,
      date,
    } = req.body;
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }
    product.image = image || product.image;
    product.productId = productId || product.productId;
    product.title = title || product.title;
    product.category = category || product.category;
    product.price = price || product.price;
    product.unitPurchaseCost = unitPurchaseCost || product.unitPurchaseCost;
    product.totalPurchaseCost = totalPurchaseCost || product.totalPurchaseCost;
    product.stock = stock || product.stock;
    product.date = date || product.date;

    await product.save();

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Product update failed",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    const imageName = product.image
      ? product.image
          .split("/")
          .slice(-2)
          .join("/")
          .replace(/\.[^/.]+$/, "")
      : null;
    if (imageName) {
      cloudinary.uploader.destroy(imageName, async (error, result) => {
        if (error) {
          return res.status(500).json({
            success: false,
            message: "Failed to delete image",
          });
        }
        await product.deleteOne();
        res.status(200).json({
          success: true,
          message: "Product and associated image deleted successfully",
        });
      });
    } else {
      await product.deleteOne();
      res.status(200).json({
        success: true,
        message: "Product deleted successfully (no image associated)",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
