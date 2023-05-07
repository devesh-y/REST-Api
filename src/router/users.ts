import express from "express"

import { deleteUser, getAllUsers, updateUser } from "../controllers/users"
import { isauthenticated, isowner } from "../middlewares/middleware-1";

export default (router:express.Router)=>{
    router.get('/users',isauthenticated,getAllUsers);  
    router.delete("/users/:id",isauthenticated,isowner,deleteUser)
    router.patch("/users/:id",isauthenticated,isowner,updateUser)
}