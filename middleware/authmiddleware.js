const jwt = require("jsonwebtoken");
require("dotenv")

const authenticateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ Error: "Authorization token required" });
  }
  const token = await authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole,
};
