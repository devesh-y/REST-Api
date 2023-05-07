import express from "express"
import http from "http"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import compression from "compression"
import cors from "cors"
import mongoose from "mongoose"
const app=express();
app.use(cors({
    credentials:true
}))
const mongourl:string=`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@restapi.ewpq7ko.mongodb.net/?retryWrites=true&w=majority`;
mongoose.Promise=Promise;
mongoose.connect(mongourl);
mongoose.connection.on("error",(error:Error)=>{
    console.log(error);
})
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server=http.createServer(app);


server.listen(5000,()=>{
    console.log("server is listening at http://localhost:5000");
})
