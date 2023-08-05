const { serverConstant } = require("../../constants");
const { logger } = require("../../utils");
const { WebSocketServer } = require("ws");
const { getWebSocketData } = require("../controllers/getWebSocketData");

/**
 * This function starts the WebSocket server. It listens for connections on the port specified in the .env file.
 * It listens for messages from the client and sends back the data to the client. It is wrapped in a try-catch block to catch any errors.
 * @example
 * request = "Hello World.";
 *
 * response = {
 * data: {"Hello World."},
 *  message: `Success.`,
 *  code: 200
 * };
 * @memberof module:app/routes
 * @returns {void}
 */
const startWebSocket = () => {
  try {
    const wss = new WebSocketServer({ port: process.env.WEB_SOCKET_PORT });
    wss.on("connection", function connection(ws) {
      ws.on("message", function message(data) {
        logger(`Received: %s", ${data}`);
        ws.send(getWebSocketData(data));
      });
      ws.addEventListener("error", (error) => {
        logger(`WebSocket error: ${error}`);
      });
      ws.send(`${serverConstant.SERVER_WEB_SOCKET_STATUS}.`);
    });
  } catch (error) {
    logger(error);
  }
};

module.exports = startWebSocket;
