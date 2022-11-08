//models
const foodModels = require("../models/foodModels");

const foodController = {
  //tạo món ăn
  createFood: async (req, res) => {
    const {
      CategoryDefault,
      NameFood,
      Describe,
      Price,
      CategoryFood,
      PriceVAT,
      FoodHot,
      FoodNew,
      OnlyBuffet,
      //
      Status,
    } = req.body;

    if (!CategoryDefault) {
      return res.status(401).json({ message: "Vui lòng chọn thể loại món ăn" });
    }

    if (!NameFood) {
      return res.status(401).json({ message: "Vui lòng thêm tên món ăn" });
    }

    if (!Describe) {
      return res.status(401).json({ message: "Vui lòng thêm mô tả món ăn" });
    }

    if (!CategoryFood) {
      return res.status(401).json({ message: "Vui lòng chọn danh mục món ăn" });
    }

    if (!Price) {
      return res.status(401).json({ message: "Vui lòng thêm giá món ăn" });
    }

    try {
      const dataCheck = await foodModels.find({ NameFood }).count();
      //kiểm tra có tên món ăn bị trùng không
      if (dataCheck > 0) {
        return res.status(401).json({ message: "Tên món ăn đã tồn tại" });
      }
      //tạo id
      const numberID = new Date().getTime();
      //All ok
      const data = await foodModels({
        CategoryDefault,
        NameFood,
        Describe,
        Price,
        CategoryFood,
        PriceVAT,
        FoodHot,
        FoodNew,
        OnlyBuffet,
        //
        Status,
        //IDnumber
        IDnumber: numberID,
      });

      await data.save();

      return res.status(200).json({ message: "Tạo món ăn thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //cập nhật món ăn
  updateFood: async (req, res) => {
    const ID = req.params.id;

    const {
      CategoryDefault,
      NameFood,
      Describe,
      Price,
      CategoryFood,
      PriceVAT,
      FoodHot,
      FoodNew,
      OnlyBuffet,
      //
      Status,
    } = req.body;

    if (!CategoryDefault) {
      return res.status(401).json({ message: "Vui lòng chọn thể loại món ăn" });
    }

    if (!NameFood) {
      return res.status(401).json({ message: "Vui lòng thêm tên món ăn" });
    }

    if (!Describe) {
      return res.status(401).json({ message: "Vui lòng thêm mô tả món ăn" });
    }

    if (!CategoryFood) {
      return res.status(401).json({ message: "Vui lòng chọn danh mục món ăn" });
    }

    if (!Price) {
      return res.status(401).json({ message: "Vui lòng thêm giá món ăn" });
    }
    try {
      const dataCheck = await foodModels.find({ NameFood }).count();
      //kiểm tra có tên món ăn bị trùng không
      if (dataCheck > 1) {
        return res.status(401).json({ message: "Tên món ăn đã tồn tại" });
      }

      //All ok lưu
      await foodModels.findByIdAndUpdate(
        { _id: ID },
        {
          CategoryDefault,
          NameFood,
          Describe,
          Price,
          CategoryFood,
          PriceVAT,
          FoodHot,
          FoodNew,
          OnlyBuffet,
          //
          Status,
        }
      );

      return res.status(200).json({ message: "Cập nhật món ăn thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //xóa món ăn
  deleteFood: async (req, res) => {
    const ID = req.params.id;
    try {
      await foodModels.findByIdAndDelete({ _id: ID });

      return res.status(200).json({ message: "Xóa thành công món ăn" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //Đọc hết tất cả món ăn
  getAllFood: async (req, res) => {
    try {
      const data = await foodModels.find();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy tất cả món ăn theo tag (Hot, mới)
  getAllFoodTagb: async (req, res) => {
    const { typeN, value } = req.body
    try {
      const data = await foodModels.find({ [typeN]: value });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //đọc chi tiết món ăn
  getDetailFood: async (req, res) => {
    const ID = req.params.id;

    try {
      const data = await foodModels.findById({ _id: ID });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //thay đổi trạng thái món ăn
  changeStatusFood: async (req, res) => {
    const ID = req.params.id;
    const { Status } = req.body;

    try {
      await foodModels.findByIdAndUpdate({ _id: ID }, { Status });

      return res
        .status(200)
        .json({ message: "Thay đổi trạng thái món ăn thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy tất cả đồ ăn theo danh mục
  getAllFoodByCategory: async (req, res) => {
    const { CategoryFood } = req.body

    if (!CategoryFood) {
      return res.status(401).json({ message: 'nhập mã id CategoryFood' })
    }
    try {
      const data = await foodModels.find({ CategoryFood })

      return res
        .status(200)
        .json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  }
};

module.exports = foodController;
