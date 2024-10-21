const Order = require("../../models/Order");
const Product = require("../../models/Product");
const mongoose = require("mongoose");

const addOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();  // Start a transaction

  try {
    const { productId, quantity, price, date } = req.body;
    const productExist = await Product.findOne({ productId });

    if (!productExist) {
      return res.json({ success: false, message: "Product not found" });
    }
    // check if product qunatity is available
    if (productExist?.stock < quantity) {
      return res.json({ success: false, message: "Product quantity not available" });
    }

    // update product stock
    productExist.stock -= quantity;
    await productExist.save({ session });

    // Create order
    const totalPrice = quantity * price;
    const order = new Order({ productId, quantity, price, totalPrice,  date });
    await order.save({ session });

     // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ success: true, data: order });
  } catch (error) {
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

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { productId, quantity, price, date } = req.body;
    const order = await Order.findById(req.params.id).session(session);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Find the product associated with the order
    const product = await Product.findOne({ productId: order.productId }).session(session);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Update the stock based on quantity change
    const quantityDifference = quantity - order.quantity; // Difference between old and new quantity
    if (product.stock < quantityDifference) {
      return res.status(400).json({ success: false, message: "Insufficient stock for the update" });
    }

    // Update product stock
    product.stock -= quantityDifference; // Adjust stock by the difference in quantity
    await product.save({ session });

    const totalPrice = quantity * price;
    // Update the order fields
    order.productId = productId || order.productId;
    order.quantity = quantity || order.quantity;
    order.price = price || order.price;
    order.totalPrice = totalPrice;
    order.date = date || order.date;

    // Save the updated order
    await order.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, data: order });
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

const deleteOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();  // Start a transaction

  try {
    const order = await Order.findById(req.params.id).session(session);
    
    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    // Find the associated product
    const product = await Product.findOne({ productId: order.productId }).session(session);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    // Update the product stock by adding back the order quantity
    product.stock += order.quantity;
    await product.save({ session });

    // Delete the order
    await order.deleteOne({ session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ success: true, message: "Order deleted and product stock updated" });
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

module.exports = { addOrder, getAllOrders, updateOrder, deleteOrder };