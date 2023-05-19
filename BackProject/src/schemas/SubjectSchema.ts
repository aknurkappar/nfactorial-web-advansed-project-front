import { Schema } from "mongoose"

export const subjectSchema = new Schema({
    title: {type: String, required: true, unique : true},
    point : {type : Number, required: true}
})
