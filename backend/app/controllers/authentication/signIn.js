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

const signIn = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const maxCookieAge = JSON.parse(process.env.MAX_COOKIE_AGE);
    const userData = req.body;

    const existingUser = await checkExistingUser(userData.username);
    if (!existingUser) {
      response.message = `${responseConstant.INVALID_CREDENTIALS}`;
      response.code = responseCodeConstant.UNAUTHORIZED;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const passwordComparisionResult = await compare(
      userData.password,
      existingUser.password
    );
    if (!passwordComparisionResult) {
      response.message = `${responseConstant.INVALID_CREDENTIALS}`;
      response.code = responseCodeConstant.UNAUTHORIZED;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    response.data = {
      username: existingUser.username,
    };

    response.message = `${responseConstant.SIGNIN_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);

    const token = generateJWT({ username: existingUser.username });
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
