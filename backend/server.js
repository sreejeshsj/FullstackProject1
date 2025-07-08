import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectToDB from './config/mongoDB.js'
//App config
const app=express()
//middlewares
app.use(express.json())
app.use(cors())//we access backend from any ip
//database connection
connectToDB()
//api end points
app.get('/',(req,res)=>{
    res.send("Api Working")
})

const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`);
    
})
