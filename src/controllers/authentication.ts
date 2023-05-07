import express from "express"
import { createUser, getUserbyEmail} from "../db/users";
import { random,authentication } from "../helper/helper";
export const register=async (req:express.Request,res:express.Response)=>{
    try{
        const {email,password,username}=req.body;
        if(!email || !password || !username){
            return res.status(400).send("invalid credentials")
        }
        const existinguser=await getUserbyEmail(email);
        if(existinguser){
            return res.sendStatus(400)
        }

        const salt=random();
        const user=await createUser({
            email,
            username,
            authentication:
            {
                salt,
                password: authentication(salt,password)
            }

        })  
        return res.status(200).json(user).end();
    }
    catch(error){
        console.log(error);
        return res.status(400).send("error occured")
    }
}