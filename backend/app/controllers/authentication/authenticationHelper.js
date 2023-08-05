const { logger } = require("../../../utils/logger");
const User = require("../../models/user");

/**
 * This function checks if the user exists in the database using the username.
 * @memberof module:app/controllers/authentication
 * @async
 * @param {string} username is the username of the user to be checked.
 * @returns {{}} a mongoose document returned after querying the database.
 * @example
 * const existingUser = await checkExistingUser(userData.username); // It returns the user object if the user exists in the database. Otherwise, it returns null.
 */
const checkExistingUser = async (username) => {
  let cursorData = null;
  if (!username) {
    return cursorData;
  }
  await User.findOne({ username: username }) // Check if user exists in the database using the username.
    .select("username password")
    .then((result) => {
      cursorData = result;
    })
    .catch((error) => {
      logger(error);
      cursorData = null;
    });
  return cursorData;
};

module.exports = { checkExistingUser };
