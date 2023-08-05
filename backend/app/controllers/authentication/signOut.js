const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");

const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");

/**
 * GET /api/signout
 * <br/>
 * This function is used to sign out a user. This method is not used in the application. I don't know why I wrote this. I don't know. I am just rambling now. I should stop. I will stop. I am stopping. I have stopped.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @deprecated It's not used anywhere in the application.
 * @async
 * @example
 * // possible responses for this endpoint (along with JWT token in the response headers)
 *  {
 *    "data": {},
 *    "message": "Sign out successful." | "/signout failed."
 *    "code": 200 | 500
 *  }
 * @memberof module:app/controllers/authentication
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const signOut = async (req, res) => {
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
    // See it does nothing.
    response.message = `${responseConstant.SIGN_OUT_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.SIGN_OUT} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signOut };
