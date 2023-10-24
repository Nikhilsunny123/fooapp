import jwt from "jsonwebtoken";

function adminAuthenticator(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, "nikhilTest");
    console.log(decoded);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

export default adminAuthenticator;
