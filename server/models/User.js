const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 20,
        minLength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ["user", "admin", "super-admin"],
        default: "user",
    },
    lastLogin: {
        type: Date, // Store the last login time as a Date
        default: null, // Initially set to null
      },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;