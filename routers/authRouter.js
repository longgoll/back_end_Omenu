const express = require("express");
const router = express.Router();

const authController = require('../controllers/authControllers');

//Đăng kí tài khoản
router.post("/register", authController.registerAccount)
//Đăng nhập tài khoản


module.exports = router;