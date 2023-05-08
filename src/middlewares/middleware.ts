import express from "express"
import {get,merge} from "lodash"
import { getUserbySessionToken } from "../db/users"
export const isAdmin=async (req:express.Request,res:express.Response)=>{
    try {
        
        const currentUserId=get(req,'identity._id') as string;
        if(!currentUserId){
            return res.status(400).send("not a user")
        }  
        const checkadmin=get(req,'identity.authentication.isAdmin');
        if(checkadmin===false || checkadmin==undefined || checkadmin==null){
            return res.status(400).send("not an owner")
        }
        
    } 
    catch (error) {
        return res.status(404).send("error occured")
    }   
}
export const isauthenticated=async (req:express.Request,res:express.Response)=>{
    try{
        const sessionToken=req.cookies[process.env.COOKIE];
        if(!sessionToken){
            return res.status(403).send("login first");
        }
        const existinguser=await getUserbySessionToken(sessionToken).select("authentication.isAdmin");
        if(!existinguser){
            return res.status(403).send("login first");
        }
        merge(req,{identity:existinguser});
        //here the req object will now contain the identity property also
       
    }
    catch(error){
        return res.status(404).send("error")
    }
}