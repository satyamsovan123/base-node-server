const express = require("express");
const router = express.Router();
const { getData, getRandomData } = require("../controllers/data/getData");
const { postData } = require("../controllers/data/postData");
const { verifyRequest } = require("../middlewares/verifyRequest");
const { verifyJWT } = require("../middlewares/verifyJWT");

router.get("/data", verifyJWT, getData);
router.get("/random-data", getRandomData);

router.post("/data", verifyJWT, verifyRequest, postData);

module.exports = router;
