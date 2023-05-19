import { model } from "mongoose";
import { taskSchema } from "../schemas/TaskSchema.js"

export const taskModel = model("task", taskSchema)
