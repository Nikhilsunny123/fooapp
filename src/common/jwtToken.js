import jwt from "jsonwebtoken"

const jwtToken = (user) => {

  const secretKey = "nikhilTest";

  const token = jwt.sign({ user }, secretKey, { expiresIn: "3d" });

  return token;
};

export default jwtToken;
