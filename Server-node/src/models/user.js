import mongoose from "mongoose";

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

const User = mongoose.model("User", UserSchema);
export default User; // ✅ Use `export default` for ES Modules

