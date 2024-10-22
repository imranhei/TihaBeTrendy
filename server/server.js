const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoutes = require("./routes/auth/auth-routes");
const productRoutes = require("./routes/admin/product-routes");
const orderRoutes = require("./routes/admin/order-routes");
const adminUserRoutes = require("./routes/admin/user-routes");
const businessSummaryRoutes = require("./routes/admin/business-summary-routes");

const userProductRoutes = require("./routes/user/product-routes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ["POST", "PUT", "GET", "OPTIONS", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Cache-Control", "Expires", "Pragma"],
  credentials: true
}));

// Routes
app.use(express.json());
app.use(cookieParser());
app.use("/api/alive", async (req, res) => {
  res.json({ message: "Server is alive" });
});
app.use("/api/auth", authRoutes);
app.use("/api/admin/product", productRoutes);
app.use("/api/admin/order", orderRoutes);
app.use("/api/admin/user", adminUserRoutes);
app.use("/api/admin", businessSummaryRoutes);

app.use("/api/user/product", userProductRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});