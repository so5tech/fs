"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("./post"));
const put_1 = __importDefault(require("./put"));
const get_1 = __importDefault(require("./get"));
const getItemForShop_1 = __importDefault(require("./getItemForShop"));
const getItemById_1 = __importDefault(require("./getItemById"));
const searchItem_1 = __importDefault(require("./searchItem"));
const authenticator_1 = __importDefault(require("../../../middlewares/authenticator"));
exports.inventory = (0, express_1.Router)();
exports.inventory.post('/', post_1.default);
exports.inventory.get('/', (0, authenticator_1.default)(), get_1.default);
exports.inventory.put('/', put_1.default);
exports.inventory.get('/getitems', getItemForShop_1.default);
exports.inventory.get('/getitems/:_id', getItemById_1.default);
exports.inventory.get('/searchItem', searchItem_1.default);
//# sourceMappingURL=index.js.map