const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const tokenExpirationTime = process.env.TOKEN_EXPIRATION_TIME;

/**
 * This function generates a JWT token using the data passed to it.
 * @param {{}} data is the data to be encrypted in the token.
 * @example const token = generateJWT({username: "John Doe"}) // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm...
 * @returns {string} a JWT token.
 * @memberof module:utils
 */
const generateJWT = (data) => {
  const token = jwt.sign(data, secretKey, { expiresIn: tokenExpirationTime }); // Signing the token with the secret key and setting expiration time.
  return token;
};

module.exports = { generateJWT };
