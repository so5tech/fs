import { Router } from "express";
import PostController from "./post";
import PutController from "./put";

import GetController from "./get";
import GetItemForShopController from "./getItemForShop";
import GetItemByIdController from "./getItemById";
import GetSearchItemController from "./searchItem";

import TokenAuth from "../../../middlewares/authenticator";

export const inventory = Router();

inventory.post('/' ,PostController)
inventory.get('/', TokenAuth() ,GetController)
inventory.put('/' ,PutController)
inventory.get('/getitems' ,GetItemForShopController)
inventory.get('/getitems/:_id', GetItemByIdController)
inventory.get('/searchItem', GetSearchItemController)




