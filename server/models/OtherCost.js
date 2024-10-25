const mongoose = require("mongoose");

const otherCostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
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

module.exports = mongoose.model("OtherCost", otherCostSchema);
