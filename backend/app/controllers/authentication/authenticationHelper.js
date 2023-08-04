const { logger } = require("../../../utils/logger");
const User = require("../../models/user");

const checkExistingUser = async (username) => {
  let cursorData = null;
  if (!username) {
    return cursorData;
  }
  await User.findOne({ username: username })
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
