import User from "./User.js";
import { Request } from "express"

export default interface CustomUserRequest extends Request {
    user?: User;
}