import express, { Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcrypt';
import { userModel } from "../model/UserModel.js"
import auth from "../midlewares/auth.js"
import CustomUserRequest from "../interfaces/CustomUserRequest.js";
const router = express.Router()


router.post("/register", async (req : Request, res : Response) => {
    try{
        const {name, email, password, passwordCheck} = req.body

        if(name == "" || email == "" || password == "" || passwordCheck == ""){
            return res.status(400).json({message :  "Not all fields have been entered"})
        }

        if(password != passwordCheck){
          return res.status(400).json({message : "Passwords are not same"})
        }

        const existingEmail = await userModel.findOne({email : email})
        if(existingEmail){
            return res.status(400).json({message :  "An account with this email already exists"})
        }

        const salt = await bcrypt.genSalt()
        const passworHash = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name : name,
            email : email,
            password : passworHash
        })

        const savedUser = await newUser.save()
        res.json(savedUser)


    } catch(err : any){
        res.status(500).json({err : err.message})
    }
    
})


router.post("/login", async (req : Request, res : Response) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ msg: "Not all fields have been entered" });
      }
  
      const user = await userModel.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Invalid credentails" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  

      const token = jwt.sign({ id: user._id }, "TOP_SECRET");
      res.json({
        token,
        user: {
          id: user._id,
        },
      });
    } catch (error : any) {
      res.status(500).json({ err: error.message });
    }
  });
  
  // delete user account route
  router.delete("/delete", auth, async (req : CustomUserRequest, res : Response) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.user);
      res.json(deletedUser);
    } catch (error : any) {
      res.status(500).json({ err: error.message });
    }
  });
  
  // validating if user is logged in by boolean check most useful for front-end
  router.post("/tokenIsValid", async (req, res) => {
    try {
      const token = req.header("jwt-token");
      if (!token) return res.json(false);
  
      const verified = jwt.verify(token, "TOP_SECRET") as JwtPayload;
      if (!verified) return res.json(false);
  
      const user = await userModel.findById(verified.id);
      if (!user) return res.json(false);
  
      return res.json(true);
    } catch (error : any) {
      res.status(500).json({ err: error.message });
    }
  });
  
  // This route is grabbing one user
  router.get("/:id", auth, async (req : Request, res : Response) => {
    const { id } = req.params
    const user = await userModel.findOne({_id : id})
    res.status(200).json({
      name : user?.name,
      email : user?.email
    })
  });
  

export default router