const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const Post = require("../../models/post");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");

const getData = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    let data = await Post.find({}).select(
      "title article username createdAt -_id"
    );

    response.data = data;
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

const getRandomData = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    let data = await Post.find({}).select(
      "title article username createdAt -_id"
    );
    if (data.length === 0) {
      response.message = `${responseConstant.NO_DATA_FOUND}`;
      let generatedResponse = responseBuilder(response);
      return res.status(generatedResponse.code).send(generatedResponse);
    }
    const randomIndex = Math.floor(Math.random() * data.length);
    response.data = data[randomIndex];
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_ERROR;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { getData, getRandomData };
