const { serverConstant } = require("../../constants/serverConstant");
const {
  responseConstant,
  responseCodeConstant,
} = require("../../constants/responseConstant");

class CustomResponse {
  data = {};
  message = serverConstant.GENERIC_FAILURE;
  code = responseCodeConstant.GENERIC_FAILURE;

  constructor(
    data = {},
    message = serverConstant.GENERIC_FAILURE,
    code = responseCodeConstant.GENERIC_FAILURE
  ) {
    this.data = data;
    this.message = message;
    this.code = code;
  }

  build() {
    let response = {
      data: this.data,
      message: this.message,
      code: this.code,
    };
    return response;
  }
}

module.exports = { CustomResponse };
