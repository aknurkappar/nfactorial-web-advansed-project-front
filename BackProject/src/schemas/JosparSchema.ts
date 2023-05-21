import { Schema } from "mongoose"

export const josparSchema = new Schema({
    userId: {type: String, required: true, unique : true},
    startDate : {type : Date, required: true},
    time: { type: Number, required: true},
    isActive: { type: Boolean, required: true},

})
