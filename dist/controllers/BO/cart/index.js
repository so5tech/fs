"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const express_1 = require("express");
const updateCart_1 = __importDefault(require("./updateCart"));
const getCartbyUser_1 = __importDefault(require("./getCartbyUser"));
const changeCartStatus_1 = __importDefault(require("./changeCartStatus"));
exports.Cart = (0, express_1.Router)();
exports.Cart.post('/', updateCart_1.default);
exports.Cart.put('/:_id/:stage', changeCartStatus_1.default);
exports.Cart.get('/:_id', getCartbyUser_1.default);
//# sourceMappingURL=index.js.map