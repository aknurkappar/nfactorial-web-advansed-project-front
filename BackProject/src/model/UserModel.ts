import { model } from "mongoose";
import { userSchema } from "../schemas/UserSchema.js"

export const userModel = model("users", userSchema)
