import { model } from "mongoose";
import { josparSchema } from "../schemas/JosparSchema.js"

export const josparModel = model("jospar", josparSchema)
