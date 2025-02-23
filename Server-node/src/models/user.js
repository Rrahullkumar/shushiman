const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: [true, "Name is required"],
      trim: true
    },
    email: { 
      type: String, 
      required: true, 
      unique: true,
      lowercase: true
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ["customer", "owner"], 
      default: "customer" 
    }
  }, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
