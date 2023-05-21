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
    const { userId, time } = req.body

        if(userId == ""){
            return res.status(400).json({message :  "Something went wrong. Please, login again"})
        }

        const newJospar = new josparModel({
            userId : userId,
            startDate : new Date(),
            time : time,
            isActive : false
        })

        const savedJospar = await newJospar.save()
        res.json({jospar : savedJospar})
})

router.put("/:josparId", async (req : Request, res : Response) => {
    const { josparId } = req.params

    const jospar = await josparModel.findOneAndUpdate({_id : josparId}, {$set: { isActive: true }}, {returnOriginal: false} )
    res.json({jospar : jospar, josparId : josparId})
})

export default router
