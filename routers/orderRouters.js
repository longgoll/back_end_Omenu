const express = require("express");
const router = express.Router();

const orderControllers = require('../controllers/orderControllers');

//Tạo order
router.post("/create-order", orderControllers.creatOrder)
//Cập nhật order
router.put("/update-order/:id", orderControllers.updateOrder)
//huy order
router.post("/delete-order/:id", orderControllers.deleteOrder)
//lấy tất cả đơn order
router.get("/get-all-order", orderControllers.getAllOrder)
//lấy một đơn order
router.get("/get-detail-order/:id", orderControllers.getdetailOrder)
//lấy tất cả đơn order chi tiết
router.get("/get-all-order-byid", orderControllers.getAllOrderAndFoodDetail)
//lấy một đơn và chi tiết
router.get("/get-detail-order-byid/:id", orderControllers.getDetailOrderAndFoodDetail)
//lấy một đơn theo IDnumber bàn
router.post("/get-detail-order-by-idNtable", orderControllers.getDetailOrderAndFoodDetailByIDNtable)
//chuyển bàn cập nhật lại bàn trong order
router.put("/change-table", orderControllers.changeTable)
//chuyển bàn và gộp đơn
router.put("/change-table-merge", orderControllers.changeTableMerge)

module.exports = router;