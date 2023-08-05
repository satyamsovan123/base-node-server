/**
 * This file is used to export all the routes for data. It contains routes for getting data, posting data and getting random data.
 * It also uses the verifyJWT middleware to verify the JWT token wherever required.
 * @memberof app/routes
 * @exports app/routes/data
 */
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
