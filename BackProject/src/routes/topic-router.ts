import express, { Request, Response } from "express"
import { topicModel } from "../model/TopicModel.js"
const router = express.Router()

router.get("/", async (req : Request, res : Response) => {

        const topicList = await topicModel.find()
        return res.status(200).json({topicList : topicList})
})

router.get("/subject/:name", async (req : Request, res : Response) => {
    const { name } = req.params

        const topicList = await topicModel.find({subjectName : name})
        return res.status(200).json({topicList : topicList})
})


router.get("/:id", async (req : Request, res : Response) => {
    const { id } = req.params

        const subject = await topicModel.findOne({_id : id})
        return res.status(200).json({subject : subject})
})

router.post("/", async (req : Request, res : Response) => {
    const { title, subjectName } = req.body

        if(title == "" || subjectName == ""){
            return res.status(400).json({message :  "Not all fields are entered"})
        }

        const newTopic = new topicModel({
            title : title,
            subjectName : subjectName
        })

        const savedTopic = await newTopic.save()
        res.json(savedTopic)
})

export default router