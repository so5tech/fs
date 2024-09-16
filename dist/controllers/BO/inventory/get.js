"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = __importDefault(require("../../../models/inventory"));
const http_status_codes_1 = require("http-status-codes");
const GetController = async (req, res) => {
    try {
        let match = {};
        var inventory_data = await inventory_1.default.aggregate([{ $match: match }]);
        for (let i = 0; i < inventory_data.length; i++) {
            var max_date;
            var min_date;
            var total_consumtion = 0;
            for (let j = 0; j < inventory_data[i].data.length; j++) {
                total_consumtion += inventory_data[i].data[j].value;
                if (!max_date && !min_date) {
                    min_date = inventory_data[i].data[j].date;
                    max_date = inventory_data[i].data[j].date;
                    inventory_data[i].currentStage = 10;
                }
                if (max_date <= inventory_data[i].data[j].date) {
                    max_date = inventory_data[i].data[j].date;
                    if (inventory_data[i].data[j].value < 30) {
                        inventory_data[i].currentStage = 1;
                    }
                    else if (inventory_data[i].data[j].value < 60) {
                        inventory_data[i].currentStage = 5;
                    }
                    else {
                        inventory_data[i].currentStage = 9;
                    }
                }
                if (min_date > inventory_data[i].data[j].date) {
                    min_date = inventory_data[i].data[j].date;
                }
            }
            if (min_date == max_date && min_date && max_date) {
                const dayDifference = (max_date.getTime() - min_date.getTime()) / (1000 * 60 * 60 * 24);
                inventory_data[i]['cunsumption/day'] = dayDifference !== 0 ? Number(total_consumtion) / dayDifference : 0;
            }
            else {
                inventory_data[0]['cunsumption/day'] = 0;
            }
        }
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.OK,
            data: inventory_data,
            message: "All Users Data",
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = GetController;
//# sourceMappingURL=get.js.map