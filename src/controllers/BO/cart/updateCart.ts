import { ExtendedRequest, ExtendedResponse } from "../../../type/types";
import Cart from "../../../models/cart";
import {Types} from "mongoose";
import {
	ReasonPhrases,
	StatusCodes,
	getReasonPhrase,
	getStatusCode,
} from 'http-status-codes';

const PostController = async (
    req : ExtendedRequest,
    res : ExtendedResponse    
): Promise<void> => {
    try {
        // const { email, password } = req.body
        const user_cart = await Cart.findOne({
            user_id: new Types.ObjectId(String(req.body.user_id)), stage: {'$nin': ["Confermed"]}
          });
        var message:any;
        if(user_cart){
            const result = await Cart.updateOne({user_id: new Types.ObjectId(String(req.body.user_id)), stage: {'$nin': ["Confermed"]}}, req.body);
            message = `Cart Updated for user ${req.body.user_id}`
        }else {
            const Cart1 = new Cart(req.body);
            let user_cart_exist = await Cart.findOne({
                user_id: new Types.ObjectId(String(req.body.user_id)), stage: {'$nin': ["Confermed"]}
              });
            if(!user_cart_exist){
                const savedUser = await Cart1.save(); 
            }
            message = `Cart created for user ${req.body.user_id}`

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

export default PostController;