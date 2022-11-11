const kitchenModule = require('../models/kitchenModels')
const orderModels = require('../models/orderModels')

const kitchenControllers = {
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
            }).sort({ createdAt: 1 })

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

        try {
            await kitchenModule.findByIdAndUpdate({ _id: idkitchenModule }, { Complete: true })

            return res.status(200).json({ message: 'Đơn hoàn thành' })
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "Vui lòng thử lại sau" });
        }
    },
}

module.exports = kitchenControllers