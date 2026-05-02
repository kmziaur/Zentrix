import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is missing or invalid",
      });
    }

    // 2. Extract token
    const token = authHeader.split(" ")[1];

    // 3. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          message: "Token expired",
        });
      }

      return res.status(401).json({
        success: false,
        message: "Token verification failed",
      });
    }

    // 4. Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5. Attach user info to request
    req.user = {
      id: user._id,
      email: user.email,
    };

    next();

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
