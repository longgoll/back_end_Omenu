const express = require("express");
const router = express.Router();

const authController = require('../controllers/authControllers');
const middlewareController = require("../controllers/middlewareController");

//Đăng kí tài khoản
router.post("/register", middlewareController.verifyTokenAndQAAuth, authController.registerAccount)
//Đăng nhập tài khoản
router.post("/login", authController.loginAccount);
//send role
router.get("/role", middlewareController.verifyToken, authController.sendRole);
//xác thực login
router.post("/accuracy-login", authController.accuracylogin);
//lấy tất cả tài khoản
router.get("/get-all-account", middlewareController.verifyTokenAndAdminAuth, authController.GetAllAccount);
//khóa tài khoản
router.post("/lock-account", middlewareController.verifyTokenAndAdminAuth, authController.LockAccount);
//khôi phục mật khẩu
router.post("/reset-account", middlewareController.verifyTokenAndAdminAuth, authController.ResetAccount);
//xóa tài khoản 
router.post("/delete-account", middlewareController.verifyTokenAndAdminAuth, authController.DeleteAccount);

module.exports = router;