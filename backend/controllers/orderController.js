import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
//place order using COD method
const placeOrder = async (req, res) => {
  try{
    const {userId,items,amount,address}=req.body
    const orderData={
      userId,
      items,
      amount,
      address,
      paymentMethod:"COD",
      payment:false,
      date:new Date().toISOString()
    }

    const newOrder= new orderModel(orderData)
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId,{cartData:{}})

    res.json({
      success:true,
      message:"Order Placed",
      newOrder
    })

  }catch(err){
    res.json({
      success:false,
      message:"jnwewne"
    })
  }
};

//place order using Stripe method
const placeOrderStripe = async (req, res) => {};
//place order  using RazorPay method
const placeOrderRazorpay = async (req, res) => {};

//All orders data for admin panel

const allOrders = async (req, res) => {};

//User order details for frontend
const userOrders = async (req, res) => {
  const {userId}=req.body
  console.log(userId)
  try{
    
    const orderData=await orderModel.find({userId})
    res.json({
      success:true,
      orderData
    })
  }catch(err){
    res.json({
      success:false,
      message:err.message
    })
  }
};

//update order status from admin panel
const updateStatus = async (req, res) => {};

export {
  placeOrder,
  placeOrderStripe,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
