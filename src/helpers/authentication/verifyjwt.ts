import jwt from "jsonwebtoken";
// const secret: string = process.env.AUTH_SECRET;
const secret: string = "1234";
import { ExtendedResponse } from "../../type/types";
import {ErrorCode} from "../../type/errorcode";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

type verificationRespose = {
  valid: boolean;
  decoded: any;
};

const verifyJWT = (
  jsontoken: string,
  res: ExtendedResponse
): Promise<verificationRespose> => {
  return new Promise((resolve) => {
    jwt.verify(jsontoken, secret, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            if (res) res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              status_code: ErrorCode.TOKEN_EXPIRED,
              message: "Error at Auth",});
            break;
          case "JsonWebTokenError":
            if (res) res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              status_code: ErrorCode.INVALID_TOKEN,
              message: "Error at Auth",});
            break;
          default:
            if (res) res.status(StatusCodes.UNAUTHORIZED).json({
              success: false,
              status_code: ErrorCode.INVALID_TOKEN,
              message: "Error at Auth",});
            resolve({ valid: false, decoded });
        }
      } else {
        resolve({ valid: true, decoded });
      }
    });
  });
};

export default verifyJWT;
