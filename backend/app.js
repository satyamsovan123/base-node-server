require("dotenv").config();
const routes = require("./app/routes");
const { connectToMongoDB } = require("./configs/connectToMongoDB");
const startWebSocket = require("./app/routes/startWebSocket");

const port = process.env.PORT || 3000;
const useDatabase = JSON.parse(process.env.USE_DATABASE);
const useWebSocket = JSON.parse(process.env.USE_WEB_SOCKET);
global.appInfo = {
  useAuthentication: process.env.NODE_ENV === "production" ? true : false,
};

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const { getServerDetails } = require("./utils");

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Expose-Headers", "Authorization");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(routes);

// app.use(express.static("public"));

if (useDatabase) {
  connectToMongoDB();
}

if (useWebSocket) {
  startWebSocket();
}

process.on("SIGINT", () => {
  process.exit();
});

process.on("SIGTERM", () => {
  process.exit();
});

app.listen(port, () => {
  getServerDetails();
});

// npm i express cors dotenv multer mongoose cookie-parser helmet joi bcrypt jsonwebtoken moment ws mongoose-paginate-v2 jsdoc
