const express = require("express");
const router = express.Router();

const orderControllers = require('../controllers/orderControllers');

//Tạo order
router.post("/create-order", orderControllers.creatOrder)
//Cập nhật order
router.put("/update-order/:id", orderControllers.updateOrder)
//Xác nhận khách đã xong
router.post("/done", orderControllers.Done)
//thanh toán
router.post("/payment-order", orderControllers.PaymentOrder)
//Cập nhật order
router.post("/update-order-number-table", orderControllers.updateOrderByNumberTable)
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
//lấy một đơn theo IDnumber bàn chi tieets
router.post("/get-detail-order-by-idNtable", orderControllers.getDetailOrderAndFoodDetailByIDNtable)
//lấy một đơn theo Code Bill chi tieets
router.post("/get-detail-order-by-codebill", orderControllers.getDetailOrderAndFoodDetailByCodeBill)
//chuyển bàn cập nhật lại bàn trong order
router.put("/change-table", orderControllers.changeTable)
//chuyển bàn và gộp đơn
router.put("/change-table-merge", orderControllers.changeTableMerge)
//lấy một đơn chi tiết full data và bàn
router.post("/get-detail-order-by-codebill-ftable", orderControllers.getDetailOrderAndFoodDetailByCodeBillAndTable)
//lấy thống kê đơn
router.get("/statistical", orderControllers.getStatistical)
//lấy thống kê đơn theo ngay
router.post("/statistical-by-date", orderControllers.getStatisticalbydate)

module.exports = router;