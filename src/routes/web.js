const express = require("express");
const path = require("path");
const router = express.Router();
const confihgViewEngine = require("../config/viewEngine");
const app = express();
const { gethomepage, getabc } = require("../controller/homecontroller");
router.get("/abc", getabc);

router.get("/test", gethomepage);
module.exports = router;
