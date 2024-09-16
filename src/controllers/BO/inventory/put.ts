import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import inventory from "../../../models/inventory";

import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const PutController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        const update_inv = await inventory.updateOne({_id: req.body._id} ,req.body);
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            message: `inventory updated successfully ${update_inv}`,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default PutController;