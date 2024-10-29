const User = require("../../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(201).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role } = req.body;
    const userIdToUpdate = req.params.id;
    const currentUser = req.user;
    const targetUser = await User.findById(userIdToUpdate);

    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (currentUser.role === "admin") {
      if (
        targetUser.role !== "user" ||
        role !== "admin" ||
        userIdToUpdate === currentUser.id
      ) {
        return res
          .status(403)
          .json({ success: false, message: "Permission denied" });
      }
    } else if (currentUser.role === "super-admin") {
      if (targetUser.role === "super-admin") {
        return res
          .status(403)
          .json({
            success: false,
            message: "Cannot modify another super-admin",
          });
      }

      targetUser.role = role;
      await targetUser.save();
      return res.status(200).json({ success: true, data: targetUser });
    }

    res
      .status(403)
      .json({ success: false, message: "Insufficient permissions" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const currentUser = req.user;

    const targetUser = await User.findById(userIdToDelete);
    if (!targetUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      (currentUser.role === "admin" && targetUser.role !== "user") ||
      (currentUser.role === "super-admin" && targetUser.role === "super-admin")
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Permission denied" });
    }

    await targetUser.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
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
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};