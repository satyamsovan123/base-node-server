const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME;
const generateJWT = (data) => {
  const token = jwt.sign(data, secretKey, { expiresIn: tokenExpirationTime });
  return token;
};

module.exports = { generateJWT };
