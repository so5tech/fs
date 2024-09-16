import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import User from "../../../models/user";
import inventory from "../../../models/inventory";

import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

const GetSearchItemController = async (
    req: ExtendedRequest,
    res: ExtendedResponse
): Promise<void> => {
    try {
        const { q } = req.query;

        // Check if q is a string, if not handle the error
        if (!q || typeof q !== 'string') {
            return ;
        }

        // Search for items matching the query
        const items = await inventory.find({
            item_name: { $regex: new RegExp(q, 'i') }, // Case-insensitive search
        });

        if (items.length === 0) {
            return ;
        }

        // Initialize match object for aggregation
        let match: any = {
            item_name: { $regex: new RegExp(q, 'i') }
        };

        // Perform aggregation
        const inventory_data = await inventory.aggregate([{ $match: match }]);
        // Loop through each inventory item and calculate expiery_date and quantity_left
        for (let i = 0; i < inventory_data.length; i++) {
            let max_date: string | null = null;
            let quantity_left: number = 0;

            // Iterate through the data array to find the max date
            for (let j = 0; j < inventory_data[i].data.length; j++) {
                const currentDate = inventory_data[i].data[j].date;
                const currentQuantity = inventory_data[i].data[j].quantity || 0;

                // Update max_date with the most recent date
                if (!max_date || max_date <= currentDate) {
                    max_date = currentDate;
                }

                // Add to quantity_left
                quantity_left += currentQuantity;
            }

            // Update each inventory item with calculated fields
            inventory_data[i].expiery_date = max_date || '0'; // Default to '0' if no date found
            // inventory_data[i].quantity_left = quantity_left;

            // If `current_stock` is not defined, set it to 0
            if (!inventory_data[i].current_stock) {
                inventory_data[i].current_stock = 0;
            }
        }

        // Return the search result
        res.status(StatusCodes.OK).json({
            success: true,
            status_code: StatusCodes.OK,
            data: inventory_data,
            message: 'Search Result',
        });

    } catch (error) {
        console.error('Error during inventory search:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}

export default GetSearchItemController;