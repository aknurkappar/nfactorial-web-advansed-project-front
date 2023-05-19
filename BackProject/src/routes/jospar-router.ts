import express, { Request, Response } from "express"
import { josparModel } from "../model/JosparModel.js"
const router = express.Router()

router.get("/:userId", async (req : Request, res : Response) => {
    const { userId } = req.params

        if(userId == ""){
            return res.status(400).json({message :  "You need to login to get profile information"})
        }

        const jospar = await josparModel.find({userId : userId})
        return res.status(200).json({jospar : jospar})
})

router.post("/", async (req : Request, res : Response) => {
    const { userId, deadline } = req.body

        if(userId == ""){
            return res.status(400).json({message :  "You need to login to get profile information"})
        }

        if(deadline == ""){
            return res.status(400).json({message :  "Please, enter deadline for your jospar"})
        }

        const newJospar = new josparModel({
            userId : userId,
            startDate : new Date(),
            deadline : deadline,
        })

        const savedJospar = await newJospar.save()
        res.json(savedJospar)
})

export default router