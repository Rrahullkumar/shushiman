import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Get token from header
  const authHeader = req.header("Authorization");
  
  // Check if token exists
  if (!authHeader) {
    return res.status(401).json({ 
      success: false,
      message: "Access denied. No token provided." 
    });
  }

  // Verify token format
  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(401).json({ 
      success: false,
      message: "Invalid token format. Use 'Bearer <token>'" 
    });
  }

  const token = tokenParts[1];

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Check token expiration
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp < currentTime) {
      return res.status(401).json({ 
        success: false,
        message: "Token expired. Please login again." 
      });
    }

    // Attach user to request object
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);

    let errorMessage = "Invalid token";
    if (error.name === "TokenExpiredError") {
      errorMessage = "Token expired. Please login again.";
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token. Please login again.";
    }

    res.status(401).json({ 
      success: false,
      message: errorMessage 
    });
  }
};

export default authMiddleware
