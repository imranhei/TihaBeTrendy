const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: String,
    productId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: String,
    price: {
      type: Number,
      required: true,
    },
    unitPurchaseCost: {
      type: Number,
      required: true,
    },
    totalPurchaseCost: {
      type: Number,
      required: true,
    },
    stock: {
      // General stock if no variants exist
      type: Number,
      required: true,
      // required: function () {
      //   return this.variants.length === 0; // Required only if no variants
      // },
    },
    // variants: [
    //   {
    //     color: { type: String }, // Optional color
    //     size: { type: String }, // Optional size
    //     stock: { type: Number, required: true }, // Stock per variant
    //     // sku: { type: String, unique: true }, // Optional SKU for each variant
    //   },
    // ],
    date: {
      type: String,
      default: function () {
        // Return the current date in "yyyy-mm-dd" format
        return new Date().toISOString().split("T")[0];
      },
      // Check if the field is empty or not provided, and set default value
      set: function (value) {
        return value === "" ? new Date().toISOString().split("T")[0] : value;
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
