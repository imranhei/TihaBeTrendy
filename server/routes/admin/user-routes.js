const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../../controller/admin/user-controller");
const { authMiddleware, isAdmin } = require("../../controller/auth/auth-controller");

router.get("/get-all-users", authMiddleware, isAdmin, getAllUsers);
router.get("/get-user-by-id/:id", authMiddleware, isAdmin, getUserById);
router.put("/update-user/:id", authMiddleware, isAdmin, updateUser);
router.delete("/delete-user/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;