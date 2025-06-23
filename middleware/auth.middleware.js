import { createError } from "../utils/createError.js";
import jwt from "jsonwebtoken";

export const authCheckUser = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing")
    }
    const token = header.split(" ")[1]

    jwt.verify(token, process.env.SECRETUSER,(error,decode)=>{
      if(error){
        createError(401, "Invalid Token")
      }
      req.user = decode
      next()
    })                                                                                                                                                                                                                                                      
  } catch (error) {
    next(error)
  }
};

export const authCheckDoc = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header) {
      createError(401, "Token is missing")
    }
    const token = header.split(" ")[1]

    jwt.verify(token, process.env.SECRETDOCTOR,(error,decode)=>{
      if(error){
        createError(401, "Invalid Token")
      }
      req.user = decode
      next()
    })                                                                                                                                                                                                                                                      
  } catch (error) {
    next(error)
  }
};