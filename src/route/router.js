const express = require('express');
const mainController = require('../controller/main');
const auth=require("../controller/auth")
const router = express.Router();

/*

Los end point que tienen put a un lado fueron cambiados de este ultimo a post para
poder cumplir con la peticion de poder ser consumido desdesde cualquier front
los que corresponden a delet fueron cambiados por el metodo get con la misma finalidad

*/


router.post("/auth/register",mainController.register)
router.post("/auth/login",mainController.login)
router.get("/characters",auth,mainController.characters)  
router.post("/characters",auth,mainController.create)
router.post("/characters/:id",mainController.update) //put
router.get("/characters/:id",mainController.delete)  //delete 
router.get("/movies",auth,mainController.movie)
router.post("/movies",auth,mainController.movieCreate)
router.post("/movies/:id",auth,mainController.movieUpdate) //put
router.get("/movies/:id",auth,mainController.movieDelete) //delete
router.get("/gender",auth,mainController.gender)
router.post("/gender",auth,mainController.genderCreate)
router.put("/gender",auth,mainController.genderUpdate) //put
module.exports = router;