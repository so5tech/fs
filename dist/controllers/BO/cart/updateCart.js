"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = __importDefault(require("../../../models/cart"));
const mongoose_1 = require("mongoose");
const http_status_codes_1 = require("http-status-codes");
const PostController = async (req, res) => {
    try {
        // const { email, password } = req.body
        const user_cart = await cart_1.default.findOne({
            user_id: new mongoose_1.Types.ObjectId(String(req.body.user_id)), stage: { '$nin': ["Confermed"] }
        });
        var message;
        if (user_cart) {
            const result = await cart_1.default.updateOne({ user_id: new mongoose_1.Types.ObjectId(String(req.body.user_id)), stage: { '$nin': ["Confermed"] } }, req.body);
            message = `Cart Updated for user ${req.body.user_id}`;
        }
        else {
            const Cart1 = new cart_1.default(req.body);
            let user_cart_exist = await cart_1.default.findOne({
                user_id: new mongoose_1.Types.ObjectId(String(req.body.user_id)), stage: { '$nin': ["Confermed"] }
            });
            if (!user_cart_exist) {
                const savedUser = await Cart1.save();
            }
            message = `Cart created for user ${req.body.user_id}`;
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
exports.default = PostController;
//# sourceMappingURL=updateCart.js.map