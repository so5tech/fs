"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const auth_1 = require("./auth");
const inventory_1 = require("./inventory");
const cart_1 = require("./cart");
exports.ApiRouter = express_1.default.Router();
exports.ApiRouter.use('/user', user_1.User);
exports.ApiRouter.use('/auth', auth_1.Auth);
exports.ApiRouter.use('/inventory', inventory_1.inventory);
exports.ApiRouter.use('/cart', cart_1.Cart);
//# sourceMappingURL=apis.js.map