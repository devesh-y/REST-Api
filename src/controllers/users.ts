import express from "express"

import { deleteUserById, getUserById, getUsers } from "../db/users"
export const getAllUsers=async (req:express.Request,res:express.Response)=>{
    try {
        const users=await getUsers();
        return res.status(200).json(users);
    } 
    catch (error) {
        return res.status(404).send("error occured")
    }
}

export const deleteUser=async (req:express.Request,res:express.Response)=>{
    try {
        const {id}=req.params
        const deleteUser=await deleteUserById(id)

        return  res.json(deleteUser)
    } 
    catch (error) {
        return res.status(400).send("error occured")   
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