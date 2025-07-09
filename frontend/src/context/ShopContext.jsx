import { createContext, useEffect, useState } from "react";

import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
export const ShopContext=createContext();

const ShopContextProvider= (props)=>{
    const [products,setProduct]=useState([])
    const currency = '$'
    const delivery_fee = 10
    const backendUrl= import.meta.env.VITE_BACKEND_URL
    const [search,setSearch]=useState('')
    const [showSearch,setShowSearch]=useState(false)
    const [cartItems,setCartItems]=useState({})
    const [token,setToken]=useState('')
    const navigate=useNavigate()
    const addToCart=async (itemId,size)=>{
        if(!size){
            toast.error('Please Select Size')
            return 
        }
        let cartData = structuredClone(cartItems)
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
        setCartItems(cartData)
    }
    const getCartCount=()=>{
        let totalCount=0
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount+=cartItems[items][item]
                    }
                }catch(err){

                }
            }
        }
        return totalCount
    }
  const updateQuantity=async(itemId,size,quantity)=>{
        let cartData=structuredClone(cartItems)
        cartData[itemId][size]=quantity
        setCartItems(cartData)
        
        
        
  }

  
    const getTotalPrice=()=>{
       let  totalPrice=0
       for(const items in cartItems){
        let productInfo=products.find((product)=>product._id===items)
        for(const item in cartItems[items]){
            try{
                if(cartItems[items][item]){
                    totalPrice=totalPrice+(cartItems[items][item]*productInfo.price)
                }
            }catch(err){
                console.log(err)
            }
           
       }
    }
       return totalPrice
    }

    const getProductData= async ()=>{
        try{
            const response= await axios.get(`${backendUrl}/api/product/list`)
            if(response.data.success){
                setProduct(response.data.product)
            }else{
                console.log(response.data.message)
            }
        }catch(err){
            console.log(err.message)
        }
    }
    useEffect(()=>{
        getProductData()
    },[])

    useEffect(()=>{
        if (!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))
        }
    },[token])
    

    const value = {
        products,currency,delivery_fee,
        search,setSearch,showSearch,setShowSearch,
        cartItems,addToCart,
        getCartCount,updateQuantity,
        getTotalPrice,navigate,backendUrl,
        setToken,token

    }
    return (
        <ShopContext.Provider value={value}>
            {
                props.children
            }
        </ShopContext.Provider>
    )
}

export default ShopContextProvider