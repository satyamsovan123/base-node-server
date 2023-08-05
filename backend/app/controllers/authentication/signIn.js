const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { compare } = require("../../../utils/passwordUtils");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const { generateJWT } = require("../../../utils/generateJWT");
const { checkExistingUser } = require("./authenticationHelper");

/**
 * POST /api/signin
 * <br/>
 * This function is used to sign in a user. It first checks if the user exists in the database using {@link module:app/controllers/authentication|checkExistingUser} function. If the user exists, it compares the password provided by the user with the hash of password stored in the database using the {@link module:utils|compare} function from the utils folder.
 * If the password is correct, it sends a success response with the username in the response body and a JWT token in the response headers.
 * If username and passord doesn't match the Joi schema, it sends a failure response with the appropriate message in the response body. This is done in the {@link module:app/middlewares|verifyRequest} from the middlewares folder.
 * For response handling, it uses the {@link module:utils|responseBuilder} function from the utils folder.
 * It is wrapped in a try-catch block to catch any errors. In case of an error, it logs the error and sends a generic failure response.
 * @async
 * @example
 * // possible responses for this endpoint (along with JWT token in the response headers)
 *  {
 *    "data": {username: "johndoe"} | {},
 *    "message": "Sign in successful." | "Invalid credentials." | "Please provide valid data. | "/signin failed."
 *    "code": 200 | 401 | 400 | 500
 *  }
 * @memberof module:app/controllers/authentication
 * @returns {{}}
 * @param {object} req is the request object containing the HTTP request headers and the request body.
 * @param {object} res is the response object containing the HTTP response headers and the response body.
 */
const signIn = async (req, res) => {
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
    const maxCookieAge = JSON.parse(process.env.MAX_COOKIE_AGE);
    const userData = req.body;

    const existingUser = await checkExistingUser(userData.username); // Check if user exists in the database.
    if (!existingUser) {
      response.message = `${responseConstant.INVALID_CREDENTIALS}`;
      response.code = responseCodeConstant.UNAUTHORIZED;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const passwordComparisionResult = await compare(
      userData.password,
      existingUser.password
    ); // Compare the password provided by the user with the hash of password stored in the database.
    if (!passwordComparisionResult) {
      response.message = `${responseConstant.INVALID_CREDENTIALS}`;
      response.code = responseCodeConstant.UNAUTHORIZED;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    response.data = {
      username: existingUser.username,
    }; // Send the username in the response.

    response.message = `${responseConstant.SIGNIN_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);

    const token = generateJWT({ username: existingUser.username }); // Generate a JWT token using the username and send it in the response headers.

    /**
     * Before setting the Authorization header, we need to expose it to the client. We do this by setting the Access-Control-Expose-Headers header, which is done in the app.js file.
     */
    return res
      .setHeader("Authorization", `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.SIGN_IN} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signIn };
