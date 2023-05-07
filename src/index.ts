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

app.listen(5000,()=>{
    console.log("server is listening at http://localhost:5000");
})


const mongourl:string=`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@restapi.ewpq7ko.mongodb.net/test?retryWrites=true&w=majority`;
mongoose.Promise=Promise;
mongoose.connect(mongourl);
mongoose.connection.on("error",(error:Error)=>{
    console.log(error);
})


app.use("/",router());
