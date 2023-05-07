import express from "express";

import routerAuthenticate from "./routerAuthenticate";
import users from "./users";

const router=express.Router();
export default function():express.Router{
    routerAuthenticate(router);
    users(router)
    return router;
}