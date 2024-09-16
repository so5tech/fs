import express from 'express';

import { User } from "./user";
import { Auth } from "./auth";
import  {inventory}  from './inventory';
import {Cart} from './cart';

export const ApiRouter = express.Router();

ApiRouter.use('/user', User);
ApiRouter.use('/auth', Auth);
ApiRouter.use('/inventory', inventory);
ApiRouter.use('/cart', Cart);
