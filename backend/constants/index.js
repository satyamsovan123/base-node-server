/**
 * @file This file is used to export all the constants from the constants folder.
 * @module constants
 * @export serverConstant
 * @export responseConstant
 * @export responseCodeConstant
 * @export apiConstant
 * @export fieldConstant
 * @export apiVerb
 */
const { serverConstant } = require("./serverConstant");
const {
  responseConstant,
  responseCodeConstant,
  fieldConstant,
} = require("./responseConstant");

const { apiConstant, apiVerb } = require("./apiConstant");

module.exports = {
  serverConstant,
  responseConstant,
  responseCodeConstant,
  apiConstant,
  fieldConstant,
  apiVerb,
};
