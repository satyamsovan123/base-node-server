/**
 * This file is used to export all the utility functions.
 * @module utils
 * @export app/utils/logger
 * @export app/utils/getServerDetails
 * @export app/utils/responseBuilder
 * @export app/utils/getSampleData
 * @export app/utils/encrypt
 * @export app/utils/compare
 * @export app/utils/sanitizeURLQueryParam
 */
const { logger } = require("./logger");
const { getServerDetails } = require("./getServerDetails");
const { getSampleData } = require("./getSampleData");
const { encrypt, compare } = require("./passwordUtils");
const { sanitizeURLQueryParam } = require("./sanitizeURLQueryParam");
const { responseBuilder } = require("./responseBuilder");

module.exports = {
  logger,
  getServerDetails,
  getSampleData,
  encrypt,
  compare,
  sanitizeURLQueryParam,
  responseBuilder,
};
