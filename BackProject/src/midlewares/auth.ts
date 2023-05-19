import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, RequestHandler } from "express"
import CustomUserRequest from "../interfaces/CustomUserRequest.js"

const auth = (req : CustomUserRequest, res : Response, next : NextFunction) => {
  try {
    const token = req.header("jwt-token");
    if (!token) {
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
    }
    const verified : JwtPayload = jwt.verify(token, "TOP_SECRET") as JwtPayload
    if (!verified) {
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });
    }
    req.user = verified.id;
    next();
  } catch (error : any) {
    res.status(500).json({ err: error.message });
  }
};

export default auth;