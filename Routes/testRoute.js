const express = require("express");

const testUserControler = require("../Controller/testUserControler");

const router = express.Router();

router.get("/test-user",testUserControler);

module.exports = router;