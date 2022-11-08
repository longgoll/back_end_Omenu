const kitchenModule = require('../models/kitchenModels')

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
    }
}

module.exports = kitchenControllers