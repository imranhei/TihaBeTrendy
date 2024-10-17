const Product = require("../../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const { category = "", sortBy = "price-lowtohigh" } = req.query;
    let filters = {};

    if (category) {
      filters.category = { $in: category.split(",") };
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

    const products = await Product.find(filters)
  .select("image productId title category price stock")
  .sort(sort);

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