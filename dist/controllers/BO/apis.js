"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
exports.ApiRouter = express_1.default.Router();
exports.ApiRouter.use('/user', user_1.User);
//# sourceMappingURL=apis.js.map