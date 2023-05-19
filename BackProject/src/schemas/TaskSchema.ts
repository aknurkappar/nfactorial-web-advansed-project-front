import { Schema } from "mongoose"

export const taskSchema = new Schema({
    josparId: {type: String, required: true},
    topicId : {type: String, required: true},
    date : {type: Date, required: true},
})
