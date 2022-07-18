const express = require('express');
const mainController = require('../controller/main');

const router = express.Router();
router.get("/",mainController.home)
router.post("/auth/register",mainController.register)
router.post("/auth/login",mainController.login)
  

module.exports = router;