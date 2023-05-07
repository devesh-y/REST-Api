import express from "express";
import { login, register } from "../controllers/authentication"
import { deleteUser, getAllUsers, updateUser } from "../controllers/users"
import { isauthenticated, isowner } from "../middlewares/middleware-1";


const router=express.Router();

router.post("/auth/register",register)
router.post("/auth/login",login)
router.get('/users',isauthenticated,getAllUsers);  
router.delete("/users/:id",isauthenticated,isowner,deleteUser)
router.patch("/users/:id",isauthenticated,isowner,updateUser)

export default router;  