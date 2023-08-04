const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");

const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");

const signOut = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    // res.cookie("username", req.body?.username, {
    //   maxAge: 0,
    //   httpOnly: true,
    // });
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
