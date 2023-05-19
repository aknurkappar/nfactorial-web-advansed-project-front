import express, { Request, Response } from "express"
import { subjectModel } from "../model/SubjectModel.js"
import { subjectCombinationsModel } from "../model/SubjectCombinationsModel.js"
const router = express.Router()

router.get("/", async (req : Request, res : Response) => {

        const subjectList = await subjectCombinationsModel.find()
        return res.status(200).json({subjectList : subjectList})
})

router.get("/:id", async (req : Request, res : Response) => {
    const { id } = req.params

        const subject = await subjectCombinationsModel.find({_id : id})
        return res.status(200).json({subject : subject})
})

router.post("/", async (req : Request, res : Response) => {
    const { firstSubject, secondSubject } = req.body

        if(firstSubject == "" || secondSubject == ""){
            return res.status(400).json({message :  "Not all fields are entered"})
        }

        const newSubject = new subjectCombinationsModel({
            firstSubject : firstSubject,
            secondSubject : secondSubject
        })

        const savedSubject = await newSubject.save()
        res.json(savedSubject)
})

export default router