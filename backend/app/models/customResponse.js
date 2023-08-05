/**
 * Custom response class representing a custom response object.
 * @typedef {Joi.ObjectSchema} CustomResponse
 * @property {{}} data - The data of the response.
 * @property {number} code - The status code of the response.
 * @property {string} message - The message of the response.
 */
/**
 * This mongoose model represents the {@link CustomResponse|CustomResponse} collection in the database.
 * @constant
 * @memberof app/models
 * @exports app/models/customResponse
 */
const { serverConstant } = require("../../constants/serverConstant");
const {
  responseConstant,
  responseCodeConstant,
} = require("../../constants/responseConstant");

class CustomResponse {
  constructor(
    data = {},
    message = serverConstant.GENERIC_FAILURE,
    code = responseCodeConstant.GENERIC_FAILURE
  ) {
    this.data = data;
    this.message = message;
    this.code = code;
  }

  build() {
    let response = {
      data: this.data,
      message: this.message,
      code: this.code,
    };
    return response;
  }
}

module.exports = { CustomResponse };
