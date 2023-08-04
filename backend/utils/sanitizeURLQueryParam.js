const { parse } = require("dotenv");

const sanitizeURLQueryParam = (offset) => {
  let sanitizedOffset = 0;

  const regex = /^[0-9]*$/;
  if (regex.test(offset)) {
    return parseInt(offset);
  }

  return sanitizedOffset;
};

module.exports = { sanitizeURLQueryParam };
