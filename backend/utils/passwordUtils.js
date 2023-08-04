const bcrypt = require("bcrypt");
const { logger } = require("./logger");
const saltRounds = Number(process.env.SALT_ROUNDS);

const encrypt = async (data) => {
  try {
    const hash = await bcrypt.hash(data, saltRounds);
    return hash;
  } catch (error) {
    logger(error);
    return "";
  }
};

const compare = async (data, hash) => {
  try {
    const result = await bcrypt.compare(data, hash);
    return result;
  } catch (error) {
    logger(error);
    return false;
  }
};

module.exports = { encrypt, compare };
