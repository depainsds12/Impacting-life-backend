const jwt = require('jsonwebtoken');
const User = require('@models/user.model');

const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        try {
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (err) {
            return res.status(401).json({ message: "Token failed" });
        }
    } else {
        return res.status(401).json({ message: "No token provided" });
    }
};

const adminMiddleware = (req, res, next) => {
  console.log("req.user",req.user)
  if (req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access denied' });
};

const userMiddleware = (req, res, next) => {
  if (req.user?.role === 'user') {
    return next();
  }
  return res.status(403).json({ message: 'User access denied' });
};

module.exports = { protect, adminMiddleware, userMiddleware };
