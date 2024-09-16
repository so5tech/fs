import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import Cart from "../../../models/cart";
import Inventory from "../../../models/inventory";
import { Types } from "mongoose";
import {
    ReasonPhrases,
    StatusCodes,
    getReasonPhrase,
    getStatusCode,
} from 'http-status-codes';

function isCurrentDateString(dateString: string): boolean {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0]; // Format today's date as YYYY-MM-DD

    return dateString === todayString;
}



const PutChangeCartStatusController = async (
    req: ExtendedRequest,
    res: ExtendedResponse
): Promise<void> => {
    try {
        interface Item {
            item_id: string; // or the appropriate type for item_id
            item_name: string;
            quantity: string;
        }

        interface Result {
            user_id: string;
            is_delete: boolean;
            stage: string;
            item_list: Item[];
        }

        interface data {
            value: number; // or the appropriate type for item_id
            date: string;
            name: string;
        }
        interface Inventory1 {
            _id: string;
            item_name: string;
            discription: string;
            image_link: string;
            status: string;
            data: data[];
            levels: object;
            current_stock: number;
        }

        const today = new Date();
        const result: Result = await Cart.findOneAndUpdate({ user_id: new Types.ObjectId(String(req.params._id)), stage: { '$nin': ["Confermed"] } }, { $set: { stage: req.params.stage } });
        let message = `Cart Satus Updated for user ${req.params.user_id}`
        let item_id_list = [];
        let value = [];
        if (req.params.stage == "Confermed") {
            for (let i = 0; i < result.item_list.length; i++) {
                item_id_list.push(result.item_list[i].item_id)
                value.push(result.item_list[i].quantity)

            }
            
            let inventory: Inventory1[] = await Inventory.find({ _id: { '$in': item_id_list } });
            for (let j = 0; j < inventory.length; j++) {
                let item_id_list_index = item_id_list.findIndex(obj => obj.equals(inventory[j]._id))
                if(inventory[j].data.length == 0){
                    let data1 = []
                    data1.push({ name: 'Stage 1', value: value[item_id_list_index], date: today.toISOString().split('T')[0] });
                    let data = await Inventory.updateOne(
                        { _id: inventory[j]._id },
                        { $inc: { current_stock: -value[item_id_list_index] }, data: data1}
                    );
                //     console.log(data, inventory[j]._id)
                }
                let current_date_present = false;
                let data_to_set;  
                for (let k = 0; k < inventory[j].data.length; k++) {
                    if (isCurrentDateString(inventory[j].data[k].date)) {
                        current_date_present = true
                        inventory[j].data[k].value = inventory[j].data[k].value + value[item_id_list_index]                       

                    }
                    data_to_set = inventory[j].data
                }
                if(current_date_present){
                        
                    await Inventory.updateOne(
                        { _id: inventory[j]._id },
                        { $inc: { current_stock: -value[item_id_list_index] }, data: data_to_set }
                    );

                } else {
                    data_to_set.push({ name: `Stage ${inventory[j].data.length+1}`, value: value[item_id_list_index], date: today.toISOString().split('T')[0] });
                    await Inventory.updateOne(
                        { _id: inventory[j]._id },
                        { $inc: { current_stock: -value[item_id_list_index] }, data: data_to_set}
                    );
                }
            }

        }


        res.status(StatusCodes.CREATED).json({
            success: true,
            status_code: StatusCodes.CREATED,
            message: message,
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

export default PutChangeCartStatusController;