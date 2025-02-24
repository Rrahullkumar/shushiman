import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";

// Load environment variables first
dotenv.config();

// Configure environment detection
const isProduction = process.env.NODE_ENV === "production";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize express app
const app = express();

// Configure upload directory for Vercel compatibility
const uploadsDir = isProduction 
  ? path.join("/tmp", "uploads")
  : path.join(__dirname, "uploads");

// Ensure upload directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer with enhanced error handling
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter
});

// Enhanced CORS configuration
app.use(cors({
  origin: isProduction 
    ? process.env.FRONTEND_URL 
    : "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Body parser middleware with error handling
app.use(express.json({
  limit: "10mb",
  verify: (req, res, buf) => {
    try {
      JSON.parse(buf.toString());
    } catch (e) {
      res.status(400).json({ error: "Invalid JSON format" });
    }
  }
}));

// Serve static files with Vercel compatibility
app.use('/uploads', express.static(uploadsDir));

// Database connection handler with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    if (isProduction) process.exit(1);
  }
};

// Async server initialization
const initializeServer = async () => {
  // Load routes dynamically after DB connection
  const authRoutes = (await import("./routes/authRoutes.js")).default;
  const createMenuRoutes = (await import("./routes/menuRoutes.js")).default;
  const orderRoutes = (await import("./routes/orderRoutes.js")).default;

  // Apply routes
  app.use("/api/auth", authRoutes);
  app.use("/api/menu", createMenuRoutes(upload));
  app.use("/api/orders", orderRoutes);

  // Add health check endpoint
  app.get("/health", (req, res) => res.json({ status: "healthy" }));

  // Preserve existing request logging
  app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Enhanced error handling
  app.use((err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`);
    
    // Handle multer errors
    if (err instanceof multer.MulterError) {
      return res.status(400).json({
        error: "File Upload Error",
        message: err.message
      });
    }

    res.status(err.status || 500).json({
      error: "API Error",
      message: err.message
    });
  });

  // Preserve 404 handler
  app.use((req, res) => res.status(404).json({ error: "Endpoint not found" }));
};

// Server startup sequence
const start = async () => {
  try {
    await connectDB();
    await initializeServer();
    
    if (!isProduction) {
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
      });
    }
  } catch (err) {
    console.error("🔥 Server startup failed:", err);
    process.exit(1);
  }
};

// Start the server
start();

// Vercel requires this export
export default app;