import express from "express";
import { login, register } from "../controllers/login_and_register"
import { deleteUser, getAllUsers, updateUser } from "../controllers/user_handlers"
import { isauthenticated, isowner } from "../middlewares/middleware";


const router=express.Router();

router.post("/auth/register",register)
router.post("/auth/login",login)
router.get('/users',isauthenticated,getAllUsers);  
router.delete("/users/:id",isauthenticated,isowner,deleteUser)
router.patch("/users/:id",isauthenticated,isowner,updateUser)

export default router;  