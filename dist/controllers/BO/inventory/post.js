"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inventory_1 = __importDefault(require("../../../models/inventory"));
const http_status_codes_1 = require("http-status-codes");
const PostController = async (req, res) => {
    try {
        // const { email, password } = req.body
        const inventory1 = new inventory_1.default(req.body.newData);
        const savedUser = await inventory1.save();
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            status_code: http_status_codes_1.StatusCodes.CREATED,
            message: `User created successfully ${savedUser}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.default = PostController;
//# sourceMappingURL=post.js.map