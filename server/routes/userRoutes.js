import express from "express";
//const router = require('express').Router();
import AuthenticationController from "../controllers/userController.js";

//import auth from "../middleware/authMiddleware.js";

const router = express.Router();

//router.use(auth)
router.post("/register", AuthenticationController.userRegister);
router.post("/login", AuthenticationController.user);



//router.put("/:id", userUpdate)
//router.get(, readUser)
//router.delete(, deleteUser)

export default router;




