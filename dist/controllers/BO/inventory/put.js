"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = __importDefault(require("../../../models/inventory"));
const http_status_codes_1 = require("http-status-codes");
const PutController = async (req, res) => {
    try {
        const update_inv = await inventory_1.default.updateOne({ _id: req.body._id }, req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.OK,
            message: `inventory updated successfully ${update_inv}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = PutController;
//# sourceMappingURL=put.js.map