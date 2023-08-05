const {
  responseConstant,
  responseCodeConstant,
  serverConstant,
  apiConstant,
  apiVerb,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const Joi = require("joi");
const {
  dataValidatorSchema,
  signInValidatorSchema,
  signUpValidatorSchema,
} = require("../models/");

/**
 * This function validates the request body for different API endpoints. It uses the Joi library for validation. It uses different Joi schemas like {@link module:app/models/signInValidatorSchema|signInValidatorSchema}, {@link module:app/models/signUpValidatorSchema|signUpValidatorSchema}, {@link module:app/models/dataValidatorSchema|dataValidatorSchema} from the models folder for different API endpoints.
 * For response, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it sends back the error message in the response.
 * @async
 * @example
 * // possible responses for this endpoint
 *  {
 *    "data": {},
 *    "message": "Please provide valid data."
 *    "code": 401
 *  }
 * @memberof module:app/middlewares
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 * @param {object} next is the callback function that is used to call the middleware function which is after the this middleware function.
 */
const verifyRequest = async (req, res, next) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const currentPath = req.path;
    const currentMethod = req.method;
    const userData = req.body;

    // Switch case to validate the request body for different API endpoints using different Joi schemas.
    switch (currentPath) {
      case apiConstant.SIGN_UP:
        await signUpValidatorSchema.validateAsync(userData);
        break;

      case apiConstant.SIGN_IN:
        await signInValidatorSchema.validateAsync(userData);
        break;

      case apiConstant.DATA:
        if (currentMethod === apiVerb.POST)
          await dataValidatorSchema.validateAsync(userData);
        break;

      default:
        break;
    }
    next(); // Call the next middleware function if everything is successful.
  } catch (error) {
    response.message = `${responseConstant.PLEASE_PROVIDE_VALID_DATA} ${error.message}`;
    response.code = responseCodeConstant.INVALID_REQUEST;
    let generatedResponse = responseBuilder(response);
    logger(error);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyRequest };
