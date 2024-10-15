const Product = require("../../models/Product");

const getAllProducts = async (req, res) => {
  try {
    // Fetch all products but only return selected fields
    const products = await Product.find({}).select(
      "image productId title category price stock"
    );
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
    const product = await Product.findById(req.params.id).select(
      "image productId title category price stock"
    );
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

module.exports = {
  getAllProducts,
  getProductById,
};