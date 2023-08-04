const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const { encrypt } = require("../../../utils/passwordUtils");

const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const { generateJWT } = require("../../../utils/generateJWT");
const User = require("../../models/user");
const { checkExistingUser } = require("./authenticationHelper");

const signUp = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    // const maxCookieAge = JSON.parse(process.env.MAX_COOKIE_AGE);
    const userData = req.body;

    const existingUser = await checkExistingUser(userData.username);
    if (existingUser) {
      response.message = `${responseConstant.USER_ALREADY_REGISTERED}`;
      response.code = responseCodeConstant.ALREADY_EXISTS;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }

    const encryptedPassword = await encrypt(userData.password);
    const newUser = new User({
      username: userData.username,
      password: encryptedPassword,
      email: userData?.email,
    });

    const data = await User.create(newUser);

    response.message = `${responseConstant.SIGNUP_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);

    const token = generateJWT({ username: data.username });
    // res.set("Authorization", `Bearer ${token}`);
    // res.cookie(apiConstant.ACCESS_TOKEN, token, {
    //   maxAge: maxCookieAge,
    //   httpOnly: true,
    // });

    return res
      .setHeader("Authorization", `Bearer ${token}`)
      .status(generatedResponse.code)
      .send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.SIGN_UP} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { signUp };
