require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");

// Environment variables
const port = process.env.PORT || 3000;
const useDatabase = JSON.parse(process.env.USE_DATABASE);
const useWebSocket = JSON.parse(process.env.USE_WEB_SOCKET);
global.appInfo = {
  useAuthentication: process.env.NODE_ENV === "production" ? true : false,
};

// Importing modules
const { getServerDetails } = require("./utils");
const routes = require("./app/routes");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const startWebSocket = require("./app/routes/startWebSocket");

// Configuring CORS
app.use(cors());
// Exposing Authorization header to be accessible by the client
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

// Configuring Express
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(routes);
// app.use(express.static("public"));

// Enabling or disabling database connection
if (useDatabase) {
  connectToMongoDB();
}

// Enabling or disabling webSocket connection
if (useWebSocket) {
  startWebSocket();
}

// Handling uncaught exceptions
process.on("SIGINT", () => {
  process.exit();
});
process.on("SIGTERM", () => {
  process.exit();
});

// Listening to the server
app.listen(port, () => {
  getServerDetails();
});

// Install the following packages:
// npm i express cors dotenv multer mongoose cookie-parser helmet joi bcrypt jsonwebtoken moment ws mongoose-paginate-v2 jsdoc
