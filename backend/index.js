import express from "express"
import cors from 'cors';
import bodyParser from 'body-parser';
import Router from "./Routes/Router.js"
import connectToMongo from "./config/db.js";
const app = express()
const port = 9000

connectToMongo()
app.use(cors());
app.use(express.json())
app.use("/api", Router)
app.listen(port , ()=>{
    console.log(`Server is Running at Port ${port}`)
})

app.get("/", (req, res)=>{
    res.send("You Visited At Server Side !!")
})