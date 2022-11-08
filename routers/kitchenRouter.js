const express = require("express");
const router = express.Router();

const kitchenControllers = require('../controllers/kitchenControllers');

//đọc hóa đơn mưới
router.get("/new-order-k", kitchenControllers.getAllNew)
//lấy đơn đang làm
router.get("/do-order-k", kitchenControllers.getAllDo)

module.exports = router;