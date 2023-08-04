const { responseCodeConstant, serverConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

const ignoreAuthentication = async (req, res, next) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    next();
  } catch (error) {
    response.message = `${serverConstant.GENERIC_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_FAILURE;
    let generatedResponse = responseBuilder(response);
    logger(error);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { ignoreAuthentication };
