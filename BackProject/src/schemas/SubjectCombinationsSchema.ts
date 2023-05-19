import { Schema } from "mongoose"

export const subjectCombinationsSchema = new Schema({
    firstSubject: {type: String, required: true},
    secondSubject: {type: String, required: true},
})
