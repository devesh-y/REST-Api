import express from "express"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import {config} from "dotenv"
import mongoose from "mongoose"
import router from "./router/router"
const app=express();
config();   
app.use(cors({
    credentials:true    
}))  
    
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
    
app.listen(process.env.PORT,()=>{
    console.log(`server is listening at ${process.env.PORT}`);  
})

   
const mongourl:string=`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@restapi.ewpq7ko.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.Promise=Promise;  
mongoose.connect(mongourl);
mongoose.connection.on("error",(error:Error)=>{
    console.log("error occured at initial connection with database");
})
mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');

});
app.use("/",router);
     