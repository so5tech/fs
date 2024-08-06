"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// const secret: string = process.env.AUTH_SECRET;
const secret = "1234";
const errorcode_1 = require("../../type/errorcode");
const http_status_codes_1 = require("http-status-codes");
const verifyJWT = (jsontoken, res) => {
    return new Promise((resolve) => {
        jsonwebtoken_1.default.verify(jsontoken, secret, (err, decoded) => {
            if (err) {
                switch (err.name) {
                    case "TokenExpiredError":
                        if (res)
                            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                                success: false,
                                status_code: errorcode_1.ErrorCode.TOKEN_EXPIRED,
                                message: "Error at Auth",
                            });
                        break;
                    case "JsonWebTokenError":
                        if (res)
                            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                                success: false,
                                status_code: errorcode_1.ErrorCode.INVALID_TOKEN,
                                message: "Error at Auth",
                            });
                        break;
                    default:
                        if (res)
                            res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json({
                                success: false,
                                status_code: errorcode_1.ErrorCode.INVALID_TOKEN,
                                message: "Error at Auth",
                            });
                        resolve({ valid: false, decoded });
                }
            }
            else {
                resolve({ valid: true, decoded });
            }
        });
    });
};
exports.default = verifyJWT;
//# sourceMappingURL=verifyjwt.js.map