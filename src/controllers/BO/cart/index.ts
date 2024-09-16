import { Router } from "express";
import PostController from "./updateCart";
import GetController from "./getCartbyUser";
import PutChangeCartStatusController from "./changeCartStatus";
import TokenAuth from "../../../middlewares/authenticator";

export const Cart = Router();

Cart.post('/' ,PostController)
Cart.put('/:_id/:stage' ,PutChangeCartStatusController)
Cart.get('/:_id' ,GetController)


