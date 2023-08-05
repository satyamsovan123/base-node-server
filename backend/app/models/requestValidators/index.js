/**
 * This file contains all the models for request data validations.
 * @module app/models
 * @requires app/models/signInValidatorSchema
 * @requires app/models/signUpValidatorSchema
 * @requires app/models/dataValidatorSchema
 */

const { signUpValidatorSchema } = require("./signUpValidatorSchema");
const { signInValidatorSchema } = require("./signInValidatorSchema");
const { dataValidatorSchema } = require("./dataValidatorSchema");

module.exports = {
  signUpValidatorSchema,
  signInValidatorSchema,
  dataValidatorSchema,
};
