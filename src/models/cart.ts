import mongoose, {Model, Types} from "mongoose";
import inventory from "./inventory";
import User from "./user";

type CartDocument = mongoose.Document & {
    user_id: string;
    item_list: [object];
    is_delete: boolean;
    stage: string;

};

const cartSchema = new mongoose.Schema({
    
    user_id: {type: Types.ObjectId},
    item_list: [{item_id: {type: Types.ObjectId}, item_name: {type: String}, quantity: {type: Number} }],
    is_delete: {type: Boolean},
    stage: String,


}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });


export interface ICartModel extends Model<CartDocument>{

}
const Cart = mongoose.model<CartDocument, ICartModel> (
    "Cart",
    cartSchema
)
export default Cart;