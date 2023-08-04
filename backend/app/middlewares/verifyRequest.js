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
const { verifyJWT } = require("./verifyJWT");

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
    next();
  } catch (error) {
    response.message = `${responseConstant.PLEASE_PROVIDE_VALID_DATA} ${error.message}`;
    response.code = responseCodeConstant.INVALID_REQUEST;
    let generatedResponse = responseBuilder(response);
    logger(error);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyRequest };
