const kitchenModule = require('../models/kitchenModels')
const orderModels = require('../models/orderModels')

const kitchenControllers = {
    //tao don cho bep
    createOrderKotchen: async (req, res) => {
        const io = req.io
        const {
            IDAccountOrder,
            NameAccountOrder,
            OrderNumberIDFood,
            tableNumberID,
            codeBill,
        } = req.body;

        try {
            await kitchenModule({
                IDAccountOrder,
                NameAccountOrder,
                codeBill: codeBill,
                OrderNumberIDFood,
                tableNumberID,
            }).save()
            io.emit('statusOrderK', { status: 'NewOrder' })
            return res.status(200);
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },
    //lấy đơn mới
    getAllNew: async (req, res) => {

        try {
            const data = await kitchenModule.find({
                $and: [{
                    status: false,
                    Complete: false
                }]
            }).sort({ createdAt: 1 })


            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },
    //lấy đơn đang làm
    getAllDo: async (req, res) => {
        try {
            const data = await kitchenModule.find({
                $and: [{
                    status: true,
                    Complete: false
                }]
            }).sort({ createdAt: 1 })

            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //lấy đơn đã xong
    getAllComplete: async (req, res) => {
        try {
            const data = await kitchenModule.find({
                $and: [{
                    status: true,
                    Complete: true
                }]
            }).sort({ createdAt: -1 })

            return res.status(200).json({ data })
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //xác nhận nhận đơn làm
    confirmOrder: async (req, res) => {
        const { codeBill, idkitchenModule } = req.body

        try {
            await orderModels.find({ codeBill: codeBill }).updateOne({ status: true })
            await kitchenModule.findByIdAndUpdate({ _id: idkitchenModule }, { status: true })

            return res.status(200).json({ message: 'Nhận đơn thành công' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //xác nhận hoàn thành đơn
    confirmOrderComplete: async (req, res) => {
        const { idkitchenModule } = req.body
        const io = req.io

        try {
            await kitchenModule.findByIdAndUpdate({ _id: idkitchenModule }, { Complete: true, service: false })

            io.emit('OrderComplete', { status: 'OrderComplete' })
            return res.status(200).json({ message: 'Đơn hoàn thành' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },

    //lấy một đơn chi tiết full data
    getDetailOrderAndFoodDetailByid: async (req, res) => {
        const { id } = req.body;

        try {
            const data = await kitchenModule.aggregate([
                { $match: { $expr: { $eq: ['$_id', { $toObjectId: id }] } } },
                // {
                //     $match: { codeBill: { $eq: codeBill }, }
                // },
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

    //lấy trạng thái dựa vào IDnumber bàn
    getDetailOrderAndFoodDetailByNumberTable: async (req, res) => {
        const { tableNumberID } = req.body

        try {
            const data = await await kitchenModule.find({ tableNumberID }).sort({createdAt: 1})

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    }
}

module.exports = kitchenControllers