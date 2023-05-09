import express from "express"
import { createUser, getUserbyEmail} from "../db/users";
import { random,authentication } from "../helper/helper";
export const login= async(req:express.Request,res:express.Response)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(404).send("invalid credentials")
        }

        const user=await getUserbyEmail(email).select('authentication.salt authentication.password');
        if(!user){
            return res.status(400).send("no user exists with this email")
        }
        const expectedHash=authentication(user.authentication.salt,password);
        if(user.authentication.password!=expectedHash){
            return res.status(403).send("invalid credentials")
        }
        
        //adding the session token
        const salt=random();
        user.authentication.sessionToken=authentication(salt,user._id.toString());
        await user.save();
        res.cookie(process.env.COOKIE,user.authentication.sessionToken,{domain:'localhost',path:'/'})
        return res.status(200).json(user);

    }
    catch(error){
     
        return res.status(404).send("error occured")   
    }  
}
export const register=async (req:express.Request,res:express.Response)=>{
    try{
        const {email,password,username}=req.body;
        
        if(!email || !password || !username){
            return res.status(400).send("invalid credentials")
        }  
        const existinguser=await getUserbyEmail(email).catch((err)=>{
            console.log("unable to fetch email data");
        });
        if(existinguser){
            return res.status(400).send("user already exists")
        }

        const salt=random();
        const user=await createUser({
            email,
            username,
            authentication:
            {
                salt,
                password: authentication(salt,password),
                isAdmin:false
                //ignoring the session token at time of register
            }
            
        }).catch((err)=>{
            console.log("error occured at registering to server");
        })  
        return res.status(200).json(user);
    }
    catch(error){
       
        return res.status(400).send("error occured at register process")
    }
}    