import express from "express"
import {get,merge} from "lodash"
import { getUserbySessionToken } from "../db/users"
export const isowner=async (req:express.Request,res:express.Response,next:express.NextFunction)=>{
    try {
        const {id}=req.params
        const currentUserId=get(req,'identity._id') as string;
        if(!currentUserId){
            return res.status(400).send("not a user")
        }
        if(currentUserId.toString()!=id){
            return res.status(400).send("no id match")
        }
        next();  
    } 
    catch (error) {
        return res.status(404).send("error occured")
    }
}
export const isauthenticated=async function(req:express.Request,res:express.Response,next:express.NextFunction){
    try{
        const sessionToken=req.cookies[req.body.email];
        if(!sessionToken){
            return res.sendStatus(403);
        }
        const existinguser=await getUserbySessionToken(sessionToken);
        if(!existinguser){
            return res.sendStatus(403);
        }
        merge(req,{identity:existinguser});
        return next();
    }
    catch(error){

    }
}