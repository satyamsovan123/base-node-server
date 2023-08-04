const { logger } = require("../../../utils/logger");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const { responseBuilder } = require("../../../utils/responseBuilder");

const getWebSocketData = (data) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  logger(`${apiConstant.WEB_SOCKET} called.`);
  response.data = data.toString();
  response.message = `${apiConstant.WEB_SOCKET} ${responseConstant.STATUS_SUCCESSFUL}`;
  let generatedResponse = responseBuilder(response);
  return JSON.stringify(generatedResponse);
};

module.exports = { getWebSocketData };
