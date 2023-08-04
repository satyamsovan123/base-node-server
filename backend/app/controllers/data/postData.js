const { logger } = require("../../../utils/logger");
const { responseBuilder } = require("../../../utils/responseBuilder");
const moment = require("moment");
const {
  serverConstant,
  responseCodeConstant,
  responseConstant,
  apiConstant,
} = require("../../../constants");
const Post = require("../../models/post");

const postData = async (req, res) => {
  let response = {
    data: {},
    message: `${serverConstant.GENERIC_SUCCESS}`,
    code: responseCodeConstant.GENERIC_SUCCESS,
  };
  try {
    const userData = req.body;
    const newPost = new Post({
      title: userData.title,
      article: userData.article,
      username: userData.username,
    });
    const data = await Post.create(newPost);

    response.data = data;
    response.message = `${responseConstant.POST_SUCCESSFUL}`;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  } catch (error) {
    logger(error);
    response.message = `${apiConstant.DATA} ${responseConstant.STATUS_FAILURE}`;
    response.code = responseCodeConstant.GENERIC_FAILURE;
    let generatedResponse = responseBuilder(response);
    return res.status(generatedResponse.code).send(generatedResponse);
  }
};

module.exports = { postData };
