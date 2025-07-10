import userModel from "../models/userModel.js"


//add product to user cart
const addToUserCart = async(req,res)=>{
    try{
        const {userId,itemId,size}=req.body
        const user=await userModel.findById(userId)
        const cartData= await user.cartData
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1

            }else{
                cartData[itemId][size]=1
            }

        }else{
            cartData[itemId]={}
            cartData[itemId][size]=1
        }

        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({
            success:true,
            message:"Product is Added Successfully"
        })

    }catch(err){
        
        res.json({
            success:false,
            message:err.message
        })
    }
}

const updateUserCart = async (req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body
        const user=await userModel.findById(userId)
        const cartData= await user.cartData

        cartData[itemId][size]=quantity
        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({
            success:true,
            message:"Cart Updated Successfully"
        })

    }catch(err){
        
        res.json({
            success:false,
            message:err.message
        })
    }
}

const getUserCart = async (req,res)=>{
    try{
        const {userId}=req.body
        const user=await userModel.findById(userId)
        const cartData= await user.cartData

        res.json({
            success:true,
            cartData
        })

        
    }catch(err){
         res.json({
            success:false,
            message:err.message
        })
    }

}

export {
    addToUserCart,updateUserCart,getUserCart
}