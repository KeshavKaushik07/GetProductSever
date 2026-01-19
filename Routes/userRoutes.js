const express = require("express");
const {getUserContolle} = require("../Controller/userContoller");
const userMiddleWare = require("../MiddleWare/userMiddleWare");
const router = express.Router();

router.get("/getuser",userMiddleWare,getUserContolle);

module.exports = router;