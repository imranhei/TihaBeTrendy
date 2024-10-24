const Sale = require("../../models/Sale");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

const getAllSales = async (req, res) => {
  try {
    const sales = await Sale.find({});
    res.status(201).json({ success: true, data: sales });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateSale = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { orderId, customer, productId, quantity, unitPrice, date } =
      req.body;
    const sale = await Sale.findById(req.params.id).session(session);

    if (!sale) {
      return res
        .status(404)
        .json({ success: false, message: "sale not found" });
    }

    const product = await Product.findOne({
      productId: sale.productId,
    }).session(session);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Update the stock based on quantity change
    const quantityDifference = quantity - sale.quantity; // Difference between old and new quantity
    if (product.stock < quantityDifference) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient stock for the update" });
    }

    // Update product stock
    product.stock -= quantityDifference; // Adjust stock by the difference in quantity
    await product.save({ session });

    const totalPrice = quantity * unitPrice;
    // Update the sale fields
    sale.orderId = orderId || sale.orderId;
    sale.customer = {
      id: customer.id || sale.customer.id,
      name: customer.name || sale.customer.name,
      phone: customer.phone || sale.customer.phone,
      address: customer.address || sale.customer.address,
    };
    sale.productId = productId || sale.productId;
    sale.quantity = quantity || sale.quantity;
    sale.unitPrice = unitPrice || sale.unitPrice;
    sale.totalPrice = totalPrice;
    sale.date = date || sale.date;

    // Save the updated sale
    await sale.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, data: sale });
  } catch (error) {
    // Abort transaction in case of error
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteSale = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction(); // Start a transaction

  try {
    const sale = await Sale.findById(req.params.id).session(session);

    if (!sale) {
      return res.json({ success: false, message: "Sales order not found" });
    }

    // Find the associated product
    const product = await Product.findOne({
      productId: sale.productId,
    }).session(session);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Update the product stock by adding back the sale quantity
    product.stock += sale.quantity;
    await product.save({ session });

    // Delete the sale
    await sale.deleteOne({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Sale order deleted and product stock updated",
    });
  } catch (error) {
    // Abort transaction in case of error
    await session.abortTransaction();
    session.endSession();
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

module.exports = { getAllSales, updateSale, deleteSale };