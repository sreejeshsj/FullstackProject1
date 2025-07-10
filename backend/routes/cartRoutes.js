import express from 'express'
import {addToUserCart,updateUserCart,getUserCart} from '../controllers/cartController.js'
import authUser from '../middleware/userAuth.js'

const cartRouter= express.Router()

cartRouter.post('/get',authUser,getUserCart)
cartRouter.post('/add',authUser,addToUserCart)
cartRouter.post('/update',authUser,updateUserCart)

export default cartRouter