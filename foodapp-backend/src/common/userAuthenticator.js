
import jwt from "jsonwebtoken";

function userAuthenticator(req, res, next) {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, "nikhilTest");
    console.log(decoded)
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
}

export default userAuthenticator;
