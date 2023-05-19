import express, { Request, Response } from "express"
import { subjectModel } from "../model/SubjectModel.js"
const router = express.Router()

router.get("/", async (req : Request, res : Response) => {

        const subjectList = await subjectModel.find()
        return res.status(200).json({subjectList : subjectList})
})

router.get("/:id", async (req : Request, res : Response) => {
    const { id } = req.params
    if(id == ""){
        return res.status(500).json( "Id is not entered")
    }

    const subject = await subjectModel.findOne({_id : id})
    return res.status(200).json({subject : subject})
})

router.get("/title/:title", async (req : Request, res : Response) => {
    const { title } = req.params

    if(title == ""){
        return res.status(500).json( "Title is not entered")
    }
    const subject = await subjectModel.findOne({title : title})
    return res.status(200).json({subject : subject})
})

router.get("/combinations/:combinations", async (req : Request, res : Response) => {
    const { combinations } = req.params

    if(combinations == ""){
        return res.status(500).json( "Combinations is not entered")
    }
    const first = combinations.split(" ")[0]
    const second = combinations.split(" ")[1]
    const subjectFirst = await subjectModel.findOne({title : first})
    const subjectSecond = await subjectModel.findOne({title : second})
    return res.status(200).json({subjectFirst : subjectFirst, subjectSecond : subjectSecond})
})

router.post("/", async (req : Request, res : Response) => {
    const { title, point } = req.body

        if(title == "" || point == ""){
            return res.status(400).json({message :  "Not all fields are entered"})
        }

        const newSubject = new subjectModel({
            title : title,
            point : point
        })

        const savedSubject = await newSubject.save()
        res.json(savedSubject)
})

export default router