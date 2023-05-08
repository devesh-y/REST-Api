import express from "express"

import { deleteUserById, getUserById, getUsers } from "../db/users"
export const getAllUsers=async (req:express.Request,res:express.Response)=>{ 
    try {  
        const users=await getUsers();
        const obj=[];
        for(var i=0;i<users.length;i++){
            var temp={username:users[i].username,email:users[i].email,id:users[i]._id}
            obj.push(temp);
        }
        return res.status(200).json(obj);
    } 
    catch (error) {
        return res.status(404).send("error occured")
    }
}

export const deleteUser=async (req:express.Request,res:express.Response)=>{
    try {
        const {id}=req.params
        const deleteUser=await deleteUserById(id).catch((err)=>{
            console.log(err);
            console.log("error occured at deletion");
        })
        if(deleteUser==null){
            return res.status(400).send("no user exists")
        }
        res.status(200).json(deleteUser)
    } 
    catch (error) {
        return res.status(400).send("error at deletion")   
    }
}

export const updateUser=async (req:express.Request, res:express.Response)=>{
    try {
        const {username}=req.body;
        const {id}=req.params
        if(!username){
            return res.status(400).send("invalid credentials")
        }
        const user=await getUserById(id)
        user.username=username
        await user.save();
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).send("error")
    }
}