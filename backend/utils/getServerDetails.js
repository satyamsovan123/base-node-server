const { serverConstant } = require("../constants");

require("dotenv").config();

const getServerDetails = () => {
  try {
    console.log(`-`.repeat(serverConstant.APP_NAME.length + 35));
    console.log(
      `- Server status: ${serverConstant.APP_NAME.toLowerCase()} ${serverConstant.SERVER_CLI_STATUS.toLowerCase()}`
    );
    console.log(`- Process ID: ${process.pid}`);
    console.log(`- Port: ${process.env.PORT}`);
    console.log(`- Environment: ${process.env.NODE_ENV}`);
    console.log(
      `- Database: ${
        JSON.parse(process.env.USE_DATABASE)
          ? `${process.env.DATABASE_NAME}`
          : "not using database"
      }`
    );
    console.log(
      `- Authentication: ${
        JSON.parse(process.env.USE_AUTHENTICATION)
          ? `using authentication`
          : "not using authentication"
      }`
    );
    console.log(
      `- Web socket port: ${
        JSON.parse(process.env.USE_WEB_SOCKET)
          ? `${process.env.WEB_SOCKET_PORT}`
          : "not using web socket"
      }`
    );
    console.log(`-`.repeat(serverConstant.APP_NAME.length + 35));
  } catch {
    console.log(`-`.repeat(serverConstant.APP_NAME.length + 35));
    console.error(`${serverConstant.GENERIC_FAILURE}`);
    console.log(`-`.repeat(serverConstant.APP_NAME.length + 35));
  }
};

module.exports = { getServerDetails };
