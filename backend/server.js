import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectToDB from './config/mongoDB.js'

import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoute.js'


//App config
const app=express()

//middlewares
app.use(express.json())
app.use(cors())//we access backend from any ip

//database connection
connectToDB()

//api end points
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
const port=process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server is started on port ${port}`);
    
})
