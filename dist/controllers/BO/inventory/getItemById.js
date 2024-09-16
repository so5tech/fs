"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = __importDefault(require("../../../models/inventory"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const GetItemByIdController = async (req, res) => {
    try {
        let match = { _id: new mongoose_1.Types.ObjectId(req.params._id) };
        var inventory_data = await inventory_1.default.aggregate([{ $match: match }]);
        for (let i = 0; i < inventory_data.length; i++) {
            var max_date;
            var quantity_left = 0;
            for (let j = 0; j < inventory_data[i].data.length; j++) {
                if (!max_date) {
                    max_date = inventory_data[i].data[j].date;
                    quantity_left = Number(inventory_data[i].data[j].value);
                }
                if (max_date <= inventory_data[i].data[j].date) {
                    max_date = inventory_data[i].data[j].date;
                    quantity_left = Number(inventory_data[i].data[j].value);
                }
            }
            if (max_date) {
                inventory_data[i]['expiery_date'] = max_date;
                inventory_data[i]['quantity_left'] = quantity_left;
            }
            else {
                inventory_data[0]['expiery_date'] = '0';
                inventory_data[0]['quantity_left'] = 0;
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.OK,
            data: inventory_data,
            message: "All Item Data",
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = GetItemByIdController;
//# sourceMappingURL=getItemById.js.map