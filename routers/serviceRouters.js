const express = require("express");
const router = express.Router();

const serviceControllers = require('../controllers/serviceControllers')

//lấy tất cả danh sách chờ phục vụ
router.get("/get-all-servide", serviceControllers.getAllServiced)
//lấy tất cả danh sách đã phục vụ
router.get("/get-all-servide-waiting", serviceControllers.getAllWaitingService)
//xác nhận đẫ phục vụ
router.post("/servided", serviceControllers.changeServiced)

module.exports = router;