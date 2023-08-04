const { serverConstant } = require("../../constants");
const { logger } = require("../../utils");
const { WebSocketServer } = require("ws");
const { getWebSocketData } = require("../controllers/getWebSocketData");

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
