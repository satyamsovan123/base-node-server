const serverConstant = {
  GENERIC_FAILURE: "Some error occured. Please try again later.",
  GENERIC_SUCCESS: "Successfully processed request.",
  SERVER_HEALTH_STATUS_SUCCESS: "Server is working fine.",
  SERVER_HEALTH_STATUS_FAILURE:
    "Server is not working. Please try again later.",
  URI_PATH_NOT_FOUND: "This endpoint doesn't exists.",

  DATABASE_CONNECTION_FAILURE: "Error connecting to database.",
  DATABASE_CONNECTION_SUCCESS: "Successfully connected to database.",

  SERVER_WEB_SOCKET_STATUS: "Websocket is running",
  SERVER_CLI_STATUS: "Server is running",
  BASE_API: "/api/",
  SERVER_URL: "http://localhost:3000",
  APP_NAME: process.env.APP_NAME,
};

module.exports = { serverConstant };
