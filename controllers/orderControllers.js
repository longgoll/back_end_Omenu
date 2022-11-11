//module
const orderModels = require("../models/orderModels");
const foodModels = require("../models/foodModels");
const tableModels = require('../models/tableModels')
const kitchenModule = require('../models/kitchenModels')
const io = require('../index')

const orderControllers = {
  //order mon an
  creatOrder: async (req, res) => {
    const io = req.io
    const {
      IDAccountOrder,
      NameAccountOrder,
      OrderNumberIDFood,
      tableNumberID,
      amount,
      status,
    } = req.body;

    // if (!IDAccountOrder) {
    //   return res.status(401).json({ message: "ID người đặt hiện rỗng" });
    // }

    // if (!NameAccountOrder) {
    //   return res.status(401).json({ message: "Vui lòng thêm tên" });
    // }

    // if (!OrderNumberIDFood) {
    //   return res.status(401).json({ message: "Vòng lòng chọn món" });
    // }

    // if (!tableNumberID) {
    //   return res.status(401).json({ message: "Vòng lòng chọn bàn" });
    // }

    try {
      //tạo id
      const numberID = new Date().getTime();
      await orderModels({
        IDAccountOrder,
        NameAccountOrder,
        codeBill: numberID,
        OrderNumberIDFood,
        tableNumberID,
        amount,
        status,
      }).save();

      //tạo đơn chổ nấu
      await kitchenModule({
        IDAccountOrder,
        NameAccountOrder,
        codeBill: numberID,
        OrderNumberIDFood,
        tableNumberID,
      }).save()

      await tableModels.find({ IDnumber: tableNumberID }).updateOne({ StatusTable: true })
      io.emit('statusOrder', { status: 'NewOrder' })
      io.emit('statusOrderK', { status: 'NewOrder' })
      return res.status(200).json({ message: "Gọi món thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //cập nhật order
  updateOrder: async (req, res) => {
    //order mon an
    const ID = req.params.id
    const {
      IDAccountOrder,
      NameAccountOrder,
      codeBill,
      OrderNumberIDFood,
      tableNumberID,
      amount,
      status,
    } = req.body;

    // if (!IDAccountOrder) {
    //   return res.status(401).json({ message: "ID người đặt hiện rỗng" });
    // }

    // if (!NameAccountOrder) {
    //   return res.status(401).json({ message: "Vui lòng thêm tên" });
    // }

    // if (!OrderNumberIDFood) {
    //   return res.status(401).json({ message: "Vòng lòng chọn món" });
    // }

    // if (!tableNumberID) {
    //   return res.status(401).json({ message: "Vòng lòng chọn bàn" });
    // }

    try {
      //tạo id
      const numberID = new Date().getTime();
      await orderModels.findByIdAndUpdate({ _id: ID }, {
        IDAccountOrder,
        NameAccountOrder,
        codeBill,
        OrderNumberIDFood,
        amount,
        status,
        tableNumberID,
      })

      await tableModels.find({ IDnumber: tableNumberID }).updateOne({ StatusTable: true })

      return res.status(200).json({ message: "Thêm món thành công" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }

  },

  //xoa hoa don
  deleteOrder: async (req, res) => {
    const io = req.io
    const ID = req.params.id
    const { idTable, codeBill } = req.body
    try {
      await orderModels.findByIdAndDelete({ _id: ID })
      await tableModels.findByIdAndUpdate({ _id: idTable }, { StatusTable: false })
      await kitchenModule.find({ codeBill }).deleteOne()

      io.emit('statusOrder', { status: 'DeleteOrder' })
      io.emit('statusOrderK', { status: 'DeleteOrder' })
      return res.status(200).json({ message: "Huỷ đơn thành công" });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy tất cả đơn order
  getAllOrder: async (req, res) => {
    try {
      const data = await orderModels.find();

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy một đơn order
  getdetailOrder: async (req, res) => {
    const ID = req.params.id;
    try {
      const data = await orderModels.findById({ _id: ID });

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy thêm thông tin món ăn
  getAllOrderAndFoodDetail: async (req, res) => {
    try {
      const data = await orderModels.aggregate([
        {
          $lookup: {
            from: "foods",
            localField: "OrderNumberIDFood.IDFood",
            foreignField: "IDnumber",
            as: "Food",
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableNumberID",
            foreignField: "IDnumber",
            as: "Table",
          },
        },
      ]);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy một đơn và chi tiết
  getDetailOrderAndFoodDetail: async (req, res) => {
    const ID = req.params.id;

    try {
      const data = await orderModels.aggregate([
        { $match: { $expr: { $eq: ['$_id', { $toObjectId: ID }] } } },
        {
          $lookup: {
            from: "foods",
            localField: "OrderNumberIDFood.IDFood",
            foreignField: "IDnumber",
            as: "Food",
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableNumberID",
            foreignField: "IDnumber",
            as: "Table",
          },
        },
      ]);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy một đơn theo IDnumber bàn
  getDetailOrderAndFoodDetailByIDNtable: async (req, res) => {
    const { tableNumberID } = req.body;

    try {
      const data = await orderModels.aggregate([
        // { $match: { $expr: { $eq: ['$_id', { $toObjectId: ID }] } } },
        {
          $match: { tableNumberID: { $eq: tableNumberID }, }
        },
        {
          $lookup: {
            from: "foods",
            localField: "OrderNumberIDFood.IDFood",
            foreignField: "IDnumber",
            as: "Food",
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableNumberID",
            foreignField: "IDnumber",
            as: "Table",
          },
        },
      ]);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy một đơn theo IDnumber bàn chi tieets
  getDetailOrderAndFoodDetailByCodeBill: async (req, res) => {
    const { codeBill } = req.body;

    try {
      const data = await orderModels.aggregate([
        // { $match: { $expr: { $eq: ['$_id', { $toObjectId: ID }] } } },
        {
          $match: { codeBill: { $eq: codeBill }, }
        },
        {
          $lookup: {
            from: "foods",
            localField: "OrderNumberIDFood.IDFood",
            foreignField: "IDnumber",
            as: "Food",
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableNumberID",
            foreignField: "IDnumber",
            as: "Table",
          },
        },
      ]);

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //chuyển bàn cập nhật lại bàn trong order
  changeTable: async (req, res) => {
    const { tableNumberID } = req.body
    const { ChangetableNumberID } = req.body
    try {
      await orderModels.find({ tableNumberID }).updateOne({ tableNumberID: ChangetableNumberID })
      await tableModels.find({ IDnumber: ChangetableNumberID }).updateOne({ StatusTable: true })
      await tableModels.find({ IDnumber: tableNumberID }).updateOne({ StatusTable: false })

      return res.status(200).json({ message: 'Chuyển bàn thành công' })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //chuyển bàn và gộp đơn
  changeTableMerge: async (req, res) => {
    const { tableNumberID, ChangetableNumberID, OrderNumberIDFood, IDOrderNew, IDOrderOld } = req.body

    try {
      await orderModels.findByIdAndUpdate({ _id: `${IDOrderNew}` }, { tableNumberID: ChangetableNumberID, OrderNumberIDFood })
      await orderModels.findByIdAndDelete({ _id: `${IDOrderOld}` })
      await tableModels.find({ IDnumber: ChangetableNumberID }).updateOne({ StatusTable: true })
      await tableModels.find({ IDnumber: tableNumberID }).updateOne({ StatusTable: false })

      return res.status(200).json({ message: 'Chuyển bàn thành công' })
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  },

  //lấy một đơn chi tiết full data và bàn
  getDetailOrderAndFoodDetailByCodeBillAndTable: async (req, res) => {
    const { codeBill } = req.body;

    try {
      const data = await orderModels.aggregate([
        // { $match: { $expr: { $eq: ['$_id', { $toObjectId: ID }] } } },
        {
          $match: { codeBill: { $eq: codeBill }, }
        },
        {
          $lookup: {
            from: "foods",
            localField: "OrderNumberIDFood.IDFood",
            foreignField: "IDnumber",
            as: "Food",
          },
        },
        {
          $lookup: {
            from: "tables",
            localField: "tableNumberID",
            foreignField: "IDnumber",
            as: "Table",
          },
        },
      ]);

      //lay full data ban
      const dataTable = await tableModels.aggregate([
        { $match: { IDnumber: { $eq: data[0].tableNumberID } } },
        {
          $lookup: {
            from: "sectors",
            localField: "IDnumberSector",
            foreignField: "IDnumber",
            as: "Sector",
          },
        },
        { $sort: { Sector: 1 } }
      ])

      return res.status(200).json({ data: data, dataTable: dataTable });
    } catch (error) {
      return res.status(500).json({ message: "Vui lòng thử lại sau" });
    }
  }
};

module.exports = orderControllers;
