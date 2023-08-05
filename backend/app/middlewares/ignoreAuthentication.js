const { responseCodeConstant, serverConstant } = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");

/**
 * This middleware function is used to ignore authentication for a route. This exists just for testing purposes. It is not recommended to use this in production.
 * For response handling, it uses the {@link module:utils|responseBuilder} function.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @memberof module:app/middlewares
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 * @param {object} next is the callback function that is used to call the middleware function which is after the this middleware function.
 */
const ignoreAuthentication = async (req, res, next) => {
  /**
   * This default object is used to send the response back to the client.
   * @default
   * @type {object}
   */
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    /**
     * It simply calls the next middleware function.
     */
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
