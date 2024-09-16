import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import User from "../../../models/user";
import inventory from "../../../models/inventory";

import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

const GetController = async (
    req: ExtendedRequest,
    res: ExtendedResponse
): Promise<void> => {
    try {
        let match: any = {};
        var inventory_data: any = await inventory.aggregate([{ $match: match }]);
        for (let i = 0; i < inventory_data.length; i++) {
            var max_date: any;
            var min_date: any;
            var total_consumtion: Number = 0;
            for (let j = 0; j < inventory_data[i].data.length; j++) {
                total_consumtion += (inventory_data[i].data[j] as any).value;
                if (!max_date && !min_date) {
                    min_date = (inventory_data[i].data[j] as any).date;
                    max_date = (inventory_data[i].data[j] as any).date;
                    inventory_data[i].currentStage = 10;
                }
                if (max_date <= (inventory_data[i].data[j] as any).date) {
                    max_date = (inventory_data[i].data[j] as any).date;
                    if ((inventory_data[i].data[j] as any).value < 30) {
                        inventory_data[i].currentStage = 1;

                    } else if ((inventory_data[i].data[j] as any).value < 60) {
                        inventory_data[i].currentStage = 5;
                    } else {
                        inventory_data[i].currentStage = 9;
                    }
                }
                if (min_date > (inventory_data[i].data[j] as any).date) {
                    min_date = (inventory_data[i].data[j] as any).date;
                }
            }
            if (min_date == max_date && min_date && max_date) {
                const dayDifference = (max_date.getTime() - min_date.getTime()) / (1000 * 60 * 60 * 24);
                inventory_data[i]['cunsumption/day'] = dayDifference !== 0 ? Number(total_consumtion) / dayDifference : 0;
            } else {
                inventory_data[0]['cunsumption/day'] = 0;
            }

        }
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            data: inventory_data,
            message: "All Users Data",
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default GetController;