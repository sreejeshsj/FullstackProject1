import express from "express";
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/userAuth.js'
import {
  placeOrder,
  placeOrderRazorpay,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
} from "../controllers/orderController.js";


const orderRouter = express.Router()

//admin feature
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment features 
orderRouter.post('/place',authUser,placeOrder)
orderRouter.post('/stripe',authUser,placeOrderStripe)
orderRouter.post('/razorpay',authUser,placeOrderRazorpay)

//user feature
orderRouter.post('/userorders',authUser,userOrders)


export default orderRouter


