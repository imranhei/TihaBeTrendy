const OtherCost = require("../../models/OtherCost");

const addOtherCost = async (req, res) => {
  try {
    const otherCost = new OtherCost(req.body);
    await otherCost.save();
    res.status(201).json({ success: true, data: otherCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getAllOtherCosts = async (req, res) => {
  try {
    const otherCosts = await OtherCost.find({});
    res.status(201).json({ success: true, data: otherCosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateOtherCost = async (req, res) => {
  try {
    const { title, amount, date } = req.body;
    const otherCost = await OtherCost.findById(req.params.id);
    if (title) otherCost.title = title;
    if (amount) otherCost.amount = amount;
    if (date) otherCost.date = date;
    await otherCost.save();
    res.status(201).json({ success: true, data: otherCost });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteOtherCost = async (req, res) => {
  try {
    const otherCost = await OtherCost.findByIdAndDelete(req.params.id);
    if (!otherCost) {
      return res.json({ success: false, message: "Other cost not found" });
    }
    res.status(201).json({ success: true, message: "Other cost deleted" });
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
  addOtherCost,
  getAllOtherCosts,
  updateOtherCost,
  deleteOtherCost,
};
