import { model } from "mongoose";
import { subjectCombinationsSchema } from "../schemas/SubjectCombinationsSchema.js"

export const subjectCombinationsModel = model("subjectcombinations", subjectCombinationsSchema)
