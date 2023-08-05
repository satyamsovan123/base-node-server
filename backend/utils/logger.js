/**
 * This function logs data to the console. It only logs data if the environment is not production.
 * @param {*} data is the data to be logged to the console.
 * @memberof module:utils
 * @example logger("Something on the console"); // Something on the console
 * @returns {void}
 */
const logger = (data) => {
  // If the environment is production, don't log anything.
  if (process.env.NODE_ENV === "production") {
    return;
  }
  console.log("-->");
  console.log(data);
  console.log("<--");
};

module.exports = { logger };
