import express from "express";              
import { login, register } from "../controllers/login_and_register"
import { deleteUser, getAllUsers, updateUser } from "../controllers/user_handlers"
import { isauthenticated, isAdmin } from "../middlewares/middleware";
 
   
const router=express.Router();

router.post("/auth/register",register)
router.post("/auth/login",login)
router.get('/users',async(req,res)=>{
    try {
        await isauthenticated(req,res);
        await getAllUsers(req,res);  
    } catch (error) {
        console.log("error occured");
    }
})

router.delete("/users/:id", async (req, res) => {
    try {        
        await isauthenticated(req, res);
        await isAdmin(req, res);
        await deleteUser(req, res);  
    } 
    catch (error) {
        console.log("error occured");
    }
  });
router.patch("/users/:id", async (req, res, next) => {
    try {
        await isauthenticated(req, res);
        await isAdmin(req, res);
        await updateUser(req, res);
    } catch (error) {
        console.log("error occured");
    }
});

export default router;  