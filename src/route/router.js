const express = require('express');
const mainController = require('../controller/main');
const auth=require("../controller/auth")
const router = express.Router();




router.post("/auth/register",mainController.register)
router.post("/auth/login",mainController.login)
router.get("/characters",auth,mainController.characters)  
router.post("/characters",auth,mainController.create)
router.put("/characters/:id",mainController.update)
router.delete("/characters/:id",mainController.delete)
router.get("/characters",auth,mainController.search) 

router.post("/movie",auth,mainController.movieCreate)
module.exports = router;