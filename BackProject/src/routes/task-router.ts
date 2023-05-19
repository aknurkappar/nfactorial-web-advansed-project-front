import express, { Request, Response } from "express"
import { taskModel } from "../model/TaskModel.js"
const router = express.Router()

// all task list
router.get("/", async (req : Request, res : Response) => {

        const taskList = await taskModel.find()
        return res.status(200).json({taskList : taskList})
})

// plan's task list
router.get("/jospar/:josparId", async (req : Request, res : Response) => {
    const { josparId } = req.params

        const taskList = await taskModel.find({josparId : josparId})
        return res.status(200).json({taskList : taskList})
})


// get the task by id
router.get("/:id", async (req : Request, res : Response) => {
    const { id } = req.params

        const task = await taskModel.findOne({_id : id})
        return res.status(200).json({task : task})
})

router.post("/", async (req : Request, res : Response) => {
    const { josparId, topicId, date } = req.body

        if(josparId == "" || topicId == "" || date == ""){
            return res.status(400).json({message :  "Not all fields are entered"})
        }

        const newTask = new taskModel({
            josparId : josparId,
            topicId : topicId,
            date : date
        })

        const savedTask = await newTask.save()
        res.json(savedTask)
})

export default router