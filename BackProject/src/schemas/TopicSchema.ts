import { Schema } from "mongoose"

export const topicSchema = new Schema({
    title: {type: String, required: true},
    subjectName : {type: String, required: true},
})
