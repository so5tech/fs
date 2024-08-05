"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const express_1 = require("express");
const post_1 = __importDefault(require("./post"));
const get_1 = __importDefault(require("./get"));
exports.User = (0, express_1.Router)();
exports.User.post('/', post_1.default);
exports.User.get('/', get_1.default);
//# sourceMappingURL=index.js.map