import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import inventory from "../../../models/inventory";
import { Types } from "mongoose";

import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';
import mongoose from "mongoose";



const GetItemByIdController = async (
    req: ExtendedRequest,
    res: ExtendedResponse
): Promise<void> => {
    try {
        let match: any = {_id: new Types.ObjectId(req.params._id)};
        var inventory_data: any = await inventory.aggregate([{ $match: match }]);
        for (let i = 0; i < inventory_data.length; i++) {
            var max_date: any;
            var quantity_left: Number = 0;
            for (let j = 0; j < inventory_data[i].data.length; j++) {
                if (!max_date) {
                    max_date = (inventory_data[i].data[j] as any).date;
                    quantity_left = Number((inventory_data[i].data[j] as any).value);
                    
                }
                if (max_date <= (inventory_data[i].data[j] as any).date) {
                    max_date = (inventory_data[i].data[j] as any).date;
                    quantity_left = Number((inventory_data[i].data[j] as any).value);

                }
                
            }
            if ( max_date) {
                inventory_data[i]['expiery_date'] = max_date;
                inventory_data[i]['quantity_left'] = quantity_left;

            } else {
                inventory_data[0]['expiery_date'] = '0';
                inventory_data[0]['quantity_left'] = 0;

            }

        }
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            data: inventory_data,
            message: "All Item Data",
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default GetItemByIdController;