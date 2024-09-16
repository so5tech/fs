"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../../../models/cart"));
const inventory_1 = __importDefault(require("../../../models/inventory"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
function isCurrentDateString(dateString) {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD
    return dateString === todayString;
}
const PutChangeCartStatusController = async (req, res) => {
    try {
        const today = new Date();
        const result = await cart_1.default.findOneAndUpdate({ user_id: new mongoose_1.Types.ObjectId(String(req.params._id)), stage: { '$nin': ["Confermed"] } }, { $set: { stage: req.params.stage } });
        let message = `Cart Satus Updated for user ${req.params.user_id}`;
        let item_id_list = [];
        let value = [];
        if (req.params.stage == "Confermed") {
            for (let i = 0; i < result.item_list.length; i++) {
                item_id_list.push(result.item_list[i].item_id);
                value.push(result.item_list[i].quantity);
            }
            let inventory = await inventory_1.default.find({ _id: { '$in': item_id_list } });
            for (let j = 0; j < inventory.length; j++) {
                let item_id_list_index = item_id_list.findIndex(obj => obj.equals(inventory[j]._id));
                if (inventory[j].data.length == 0) {
                    let data1 = [];
                    data1.push({ name: 'Stage 1', value: value[item_id_list_index], date: today.toISOString().split('T')[0] });
                    let data = await inventory_1.default.updateOne({ _id: inventory[j]._id }, { $inc: { current_stock: -value[item_id_list_index] }, data: data1 });
                    //     console.log(data, inventory[j]._id)
                }
                let current_date_present = false;
                let data_to_set;
                for (let k = 0; k < inventory[j].data.length; k++) {
                    if (isCurrentDateString(inventory[j].data[k].date)) {
                        current_date_present = true;
                        inventory[j].data[k].value = inventory[j].data[k].value + value[item_id_list_index];
                    }
                    data_to_set = inventory[j].data;
                }
                if (current_date_present) {
                    await inventory_1.default.updateOne({ _id: inventory[j]._id }, { $inc: { current_stock: -value[item_id_list_index] }, data: data_to_set });
                }
                else {
                    data_to_set.push({ name: `Stage ${inventory[j].data.length + 1}`, value: value[item_id_list_index], date: today.toISOString().split('T')[0] });
                    await inventory_1.default.updateOne({ _id: inventory[j]._id }, { $inc: { current_stock: -value[item_id_list_index] }, data: data_to_set });
                }
            }
        }
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.CREATED,
            message: message,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = PutChangeCartStatusController;
//# sourceMappingURL=changeCartStatus.js.map