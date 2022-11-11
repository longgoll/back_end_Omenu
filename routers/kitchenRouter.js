const express = require("express");
const router = express.Router();

const kitchenControllers = require('../controllers/kitchenControllers');

//đọc hóa đơn mưới
router.get("/new-order-k", kitchenControllers.getAllNew)
//lấy đơn đang làm
router.get("/do-order-k", kitchenControllers.getAllDo)
//lấy đơn đã xong
router.get("/complete-order-k", kitchenControllers.getAllComplete)
//xác nhận nhận đơn làm
router.post("/confirm-order", kitchenControllers.confirmOrder)
//xác nhận hoàn thành đơn
router.post("/confirm-order-complete", kitchenControllers.confirmOrderComplete)

module.exports = router;