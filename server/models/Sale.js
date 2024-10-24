const mongoose = require("mongoose");

const saleSchema = new mongoose.Schema({
  orderId: {
    type: String,
    trim: true,
  },
  customer: {
    id: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true
    },
  },
  productId: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unitPrice: {
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

module.exports = mongoose.model("Sale", saleSchema);
