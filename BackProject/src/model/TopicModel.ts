import { model } from "mongoose";
import { topicSchema } from "../schemas/TopicSchema.js"

export const topicModel = model("topic", topicSchema)
