import { model } from "mongoose";
import { subjectSchema } from "../schemas/SubjectSchema.js"

export const subjectModel = model("subject", subjectSchema)
