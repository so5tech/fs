import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import Cart from "../../../models/cart";
import { Types } from "mongoose";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const GetController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        const user_id = new Types.ObjectId(req.params._id);
        const User_Cart = await Cart.find({user_id: user_id, stage: {$nin: ['Confermed']}});
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            data: User_Cart,
            message: "All Users Data",
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default GetController;