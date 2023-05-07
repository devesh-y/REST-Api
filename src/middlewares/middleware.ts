import express from "express"
import {get,merge} from "lodash"
import { getUserbySessionToken } from "../db/users"
export const isowner=async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const {id}=req.params
        const currentUserId=get(req,'identity._id') as string;
        if(!currentUserId){
            return res.status(400).send("not an owner")
        }
        if(currentUserId.toString()!=id){
            return res.status(400).send("not an owner")
        }
        next();  
    } 
    catch (error) {
        return res.status(404).send("error occured")
    }   
}
export const isauthenticated=async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try{
        const sessionToken=req.cookies[process.env.COOKIE];
        if(!sessionToken){
            return res.status(403).send("login first");
        }
        const existinguser=await getUserbySessionToken(sessionToken);
        if(!existinguser){
            return res.status(403).send("login first");
        }
        merge(req,{identity:existinguser});
        //here the req object will now contain the identity property also
        return next();
    }
    catch(error){
        return res.status(404).send("error")
    }
}