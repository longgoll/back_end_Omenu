const express = require("express");
const router = express.Router();

const foodController = require('../controllers/foodController');

//Tạo món ăn
router.post("/create-food", foodController.createFood)
//Cập nhật món ăn
router.put("/update-food/:id", foodController.updateFood)
//xóa món ăn
router.delete("/delete-food/:id", foodController.deleteFood)
//đọc tất cả món ăn
router.get("/get-all-food", foodController.getAllFood)
//lấy tất cả món ăn theo tag (Hot, mới)
router.post("/get-all-food-tagb", foodController.getAllFoodTagb)
//lấy chi tiết món ăn
router.get("/get-detail-food/:id", foodController.getDetailFood)
//thay đổi trạng thái món ăn (còn, hết)
router.put("/change-status-food/:id", foodController.changeStatusFood)
//lấy đồ ăn theo thể danh mục
router.post("/get-all-food-by-category", foodController.getAllFoodByCategory)

module.exports = router;