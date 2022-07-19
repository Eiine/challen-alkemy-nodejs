const express = require('express');
const mainController = require('../controller/main');
const auth=require("../controller/auth")
const router = express.Router();



router.get("/",auth,mainController.home)
router.post("/auth/register",mainController.register)
router.post("/auth/login",mainController.login)
router.get("/characters",mainController.characters)  
router.post("/characters",mainController.create)
router.put("/characters",mainController.put)
router.delete("/characters",mainController.delete)
module.exports = router;