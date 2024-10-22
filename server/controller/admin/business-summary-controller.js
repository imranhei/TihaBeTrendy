const Product = require("../../models/Product");
const Order = require("../../models/Order");

const getBusinessSummary = async (req, res) => {
  try {
    const products = await Product.find({});
    const orders = await Order.find({});

    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, curr) => acc + curr.totalPrice, 0);

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalOrders,
        totalRevenue,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { getBusinessSummary };