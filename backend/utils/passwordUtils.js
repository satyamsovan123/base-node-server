const bcrypt = require("bcrypt");
const { logger } = require("./logger");
const saltRounds = Number(process.env.SALT_ROUNDS);

/**
 * This function encrypts given data i.e. password using bcrypt. It is wrapped in a try-catch block to catch any errors.
 * If an error occurs, empty string is returned and the error is logged.
 * @param {string} data is the data to be encrypted.
 * @async
 * @example const encryptedPassword = await encrypt("password"); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9IiwiaWF0Ijox...
 * @memberof module:utils
 * @returns {string} encrypted data.
 */
const encrypt = async (data) => {
  try {
    const hash = await bcrypt.hash(data, saltRounds);
    return hash;
  } catch (error) {
    logger(error);
    return "";
  }
};

/**
 * This function compares given data i.e. password with the hash from the database. It is wrapped in a try-catch block to catch any errors.
 * If an error occurs, false is returned and the error is logged.
 * Contrary to the belief, this function does not decrypt the hash. It hashes the plain text data and compares it with the hash.
 * This might take some time depending on the number of rounds used to generate the hash. So, it is wrapped in an async function.
 *
 * @param {string} data is the plain text data i.e. password to be compared.
 * @param {string} hash is the hash retrived from the database.
 * @async
 * @example const result = await compare("password", "$2b$10$Z3..."); // true
 * @memberof module:utils
 * @returns {boolean} true if the data matches the hash, false otherwise.
 */
const compare = async (data, hash) => {
  try {
    // Compare the data with the hash from the database.
    const result = await bcrypt.compare(data, hash);
    return result;
  } catch (error) {
    logger(error);
    return false;
  }
};

module.exports = { encrypt, compare };
