const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
//   orderId: {
//     type: String,
//     required: true,
//     trim: true,
//     unique: true,
//   },
  // customerId: {
  //     type: String,
  //     required: true,
  //     trim: true,
  // },
  // products: [
  // {
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  totalPrice: {
      type: Number,
      required: true,
  },
  date: {
    type: String,
    default: function () {
      return new Date().toISOString().split("T")[0];
    },
    set: function (value) {
      return value === "" ? new Date().toISOString().split("T")[0] : value;
    },
  },
});

module.exports = mongoose.model("Order", orderSchema);
