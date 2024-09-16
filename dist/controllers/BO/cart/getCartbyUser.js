"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../../../models/cart"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const GetController = async (req, res) => {
    try {
        const user_id = new mongoose_1.Types.ObjectId(req.params._id);
        const User_Cart = await cart_1.default.find({ user_id: user_id, stage: { $nin: ['Confermed'] } });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.OK,
            data: User_Cart,
            message: "All Users Data",
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = GetController;
//# sourceMappingURL=getCartbyUser.js.map