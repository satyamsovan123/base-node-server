/**
 * This file contains all the models used in the application.
 * @module app/models
 * @requires app/models/post
 * @requires app/models/user
 * @requires app/models/customResponse
 */

const {
  signUpValidatorSchema,
  signInValidatorSchema,
  dataValidatorSchema,
} = require("./requestValidators/");

const { CustomResponse } = require("./customResponse");
const user = require("./user");
const post = require("./post");

module.exports = {
  signUpValidatorSchema,
  signInValidatorSchema,
  dataValidatorSchema,
  CustomResponse,
  user,
  post,
};
