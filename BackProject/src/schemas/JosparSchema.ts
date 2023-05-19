import { Schema } from "mongoose"

export const josparSchema = new Schema({
    userId: {type: String, required: true},
    startDate : {type : Date, required: true},
    deadline: { type: Date, required: true}
})
