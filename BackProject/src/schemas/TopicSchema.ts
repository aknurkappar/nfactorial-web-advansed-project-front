import { Schema } from "mongoose"

export const topicSchema = new Schema({
    title: {type: String, required: true},
    subjectId : {type: String, required: true},
})
