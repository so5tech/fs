import mongoose, {Model} from "mongoose";

type inventoryDocument = mongoose.Document & {
    item_name: string;
    discription: string;
    image_link: string;
    status: string;
    data: [object];
    levels: object;
    current_stock: number;

};

const inventorySchema = new mongoose.Schema({
    item_name: { type: String },
    discription: { type: String },
    image_link: { type: String },
    status: { type: String , default: "In_Stock"},
    data: {type: Array},
    levels: {type: Object},
    current_stock: {type: Number},
}, { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } });


export interface IinventoryModel extends Model<inventoryDocument>{

}
const inventory = mongoose.model<inventoryDocument, IinventoryModel> (
    "inventory",
    inventorySchema
)
export default inventory;

// [
//     {
//       currentStage: 5,
//       itemName: "Item 1",
//       data: [
//         { name: 'Stage 1', value: 400, date: '2024-08-01' },
//         { name: 'Stage 2', value: 300, date: '2024-08-02' },
//         { name: 'Stage 3', value: 200, date: '2024-08-03' },
//         { name: 'Stage 4', value: 278, date: '2024-08-04' },
//         { name: 'Stage 5', value: 189, date: '2024-08-05' },
//       ],
//     },
//     {
//       currentStage: 5,
//       itemName: "Item 2",
//       data: [
//         { name: 'Stage 1', value: 400, date: '2024-08-01' },
//         { name: 'Stage 2', value: 300, date: '2024-08-02' },
//         { name: 'Stage 3', value: 200, date: '2024-08-03' },
//         { name: 'Stage 4', value: 278, date: '2024-08-04' },
//         { name: 'Stage 5', value: 189, date: '2024-08-05' },
//       ],
//     }
//   ]


// {
//     id: 1,
//     title: "Lemon",
//     description: "Finish the quarterly financial report.",
//     Quantity: 10,
//     Exp_Date: "2024-08-10",
//     image_link: "https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JvY2VyeSUyMGl0ZW18ZW58MHx8MHx8fDA%3D",
//     group: "In_Stock",
//     status: "In_Stock"
// }