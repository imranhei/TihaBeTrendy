const express = require("express");
const {
  registerUser,
  login,
  logout,
  authMiddleware,
  deleteUser,
  registerSuperAdmin,
  isSuperAdmin,
  resetPassword
} = require("../../controller/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset-password", resetPassword);
router.get("/check-auth", authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({ success: true, message: "User authenticated", user });
  });
router.delete("/delete/:id", authMiddleware, isSuperAdmin, deleteUser);
router.post("/register-super-admin", authMiddleware, isSuperAdmin, registerSuperAdmin);

module.exports = router;