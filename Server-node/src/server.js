import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

// Load environment variables
dotenv.config();

// Configure environment detection
const isProduction = process.env.NODE_ENV === "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Configure upload directory (Vercel compatibility)
const uploadsDir = isProduction 
  ? path.join("/tmp", "uploads")
  : path.join(__dirname, "uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure Multer (File Upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

// CORS Configuration
// app.use(cors({
//   origin: isProduction ? process.env.FRONTEND_URL : "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// }));

const corsConfig = {
  origin: process.env.NODE_ENV === "production" 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.options("", cors(corsConfig)); //  Allow preflight requests for all routes
app.use(cors(corsConfig));

// Body Parser Middleware with Error Handling
app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf, encoding) => {
    try {
      JSON.parse(buf.toString(encoding));
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON format" });
      throw new Error("Invalid JSON");
    }
  }
}));

// Serve Static Files (for Image Uploads)
app.use('/uploads', express.static(uploadsDir));

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB connected successfully");

    // Keep MongoDB alive (for Vercel)
    setInterval(() => {
      mongoose.connection.db.admin().ping();
    }, 60000);
    
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    if (isProduction) process.exit(1);
  }
};

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

// Initialize Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);

// Health Check Route
app.get("/health", (req, res) => res.json({ 
  status: "healthy",
  mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
}));

// Request Logging Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(`[ERROR] ${err.message}`);
  
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      error: "File Upload Error",
      message: err.message
    });
  }

  res.status(err.status || 500).json({
    error: "API Error",
    message: isProduction ? "Internal server error" : err.message
  });
});

// 404 Handler (Not Found)
app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));

// Start Server
const startServer = async () => {
  try {
    await connectDB();
    
    if (!isProduction) {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error(" Server startup failed:", err);
    process.exit(1);
  }
};

// Start Server
startServer();

// Export for Vercel
export default app;
