import { Schema } from "mongoose"

export const taskSchema = new Schema({
    josparId: {type: String, required: true},
    topicFirstTask : {type: String, required: true},
    topicSecondTask : {type: String},
    topicThirdTask : {type: String},
})
