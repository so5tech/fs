import { Router } from "express";
import PostController from "./post";
import GetController from "./get";
import SoftDeleteController from "./softDelete";
import TokenAuth from "../../../middlewares/authenticator";

export const User = Router();

User.post('/' ,PostController)
User.get('/', TokenAuth() ,GetController)
User.post('/:type/:id', TokenAuth(), SoftDeleteController)



