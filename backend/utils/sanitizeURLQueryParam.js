/**
 * This function sanitizes the offset value from the URL query parameter.
 * It converts the offset value to a number and returns it, if it is a number. Otherwise, it returns 0.
 * @param {string} offset is the offset value from the URL query parameter.
 * @example sanitizeURLQueryParam("-45.3"); // 0
 * @memberof module:utils
 * @returns {number} sanitized offset value.
 */
const sanitizeURLQueryParam = (offset) => {
  let sanitizedOffset = 0;

  const regex = /^[0-9]*$/;
  if (regex.test(offset)) {
    return parseInt(offset);
  }

  return sanitizedOffset;
};

module.exports = { sanitizeURLQueryParam };
