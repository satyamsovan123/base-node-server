const { CustomResponse } = require("../app/models/customResponse");

const responseBuilder = (response) => {
  const customResponse = new CustomResponse(
    response.data,
    response.message,
    response.code
  );

  return customResponse.build();
};

module.exports = { responseBuilder };
