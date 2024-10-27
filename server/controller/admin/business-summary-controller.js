const Product = require("../../models/Product");
const Sale = require("../../models/Sale");

const getBusinessSummary = async (req, res) => {
  try {
    // const products = await Product.find({});
    // const sales = await Sale.find({});

    const totalProducts = await Product.countDocuments({ stock: { $gt: 0 } });

    // 2. Total Delivered (Total units sold)
    const totalDelivered = await Sale.aggregate([
      {
        $group: {
          _id: null, // We don't need grouping, just summing the quantity
          totalQuantity: { $sum: "$quantity" },
        },
      },
    ]);

    // 3. Total Revenue
    const totalRevenue = await Sale.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalPrice" },
        },
      },
    ]);

    // 4. Total Investment (Sum of total purchase cost of all products)
    const totalInvest = await Product.aggregate([
      {
        $group: {
          _id: null,
          totalInvestment: { $sum: "$totalPurchaseCost" },
        },
      },
    ]);

    const currentProfit = await Sale.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "productId",
          as: "productInfo",
        },
      },
      { $unwind: "$productInfo" },
      {
        $addFields: {
          profitPerSale: {
            $multiply: [
              { $subtract: ["$unitPrice", "$productInfo.unitPurchaseCost"] },
              "$quantity",
            ],
          },
        },
      },
      {
        $group: {
          _id: null,
          totalCurrentProfit: { $sum: "$profitPerSale" },
        },
      },
    ]);

    // 5. Calculate Total Profit (Revenue - Investment)
    const totalProfit = totalRevenue[0]?.totalRevenue - totalInvest[0]?.totalInvestment;

    res.status(200).json({
      success: true,
      data: {
        totalProducts,
        totalDelivered: totalDelivered[0]?.totalQuantity || 0,
        totalRevenue: totalRevenue[0]?.totalRevenue || 0,
        totalInvest: totalInvest[0]?.totalInvestment || 0,
        totalProfit: totalProfit || 0,
        currentProfit: currentProfit[0]?.totalCurrentProfit || 0,
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
