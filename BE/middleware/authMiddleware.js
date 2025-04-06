const jwt = require("jsonwebtoken");
const { User } = require("../models");
const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Invalid token user" });
    }

    req.user = user; // attach user to request
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(403).json({ message: "Token is not valid" });
  }
};

module.exports = { authenticate} ;
