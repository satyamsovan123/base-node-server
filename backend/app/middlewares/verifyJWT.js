const {
  responseConstant,
  responseCodeConstant,
  serverConstant,
  apiConstant,
} = require("../../constants");
const { logger } = require("../../utils");
const { responseBuilder } = require("../../utils/responseBuilder");
const {
  checkExistingUser,
} = require("../controllers/authentication/authenticationHelper");

const jwt = require("jsonwebtoken");

const verifyJWT = async (req, res, next) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const token = req.headers?.authorization?.split(" ")[1];
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const existingUser = await checkExistingUser(decodedData?.username);
    // existingUser.username = "test";
    if (existingUser?.username === decodedData?.username) {
      req.body["username"] = decodedData?.username;
    } else {
      response.message = `${responseConstant.UNAUTHORIZED}`;
      response.code = responseCodeConstant.UNAUTHORIZED;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    next();
  } catch (error) {
    response.message = `${responseConstant.UNAUTHORIZED}`;
    response.code = responseCodeConstant.UNAUTHORIZED;
    if (error.name === "TokenExpiredError") {
      response.message = `${responseConstant.TOKEN_EXPIRED}`;
    }
    let generatedResponse = responseBuilder(response);
    logger(error);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { verifyJWT };
