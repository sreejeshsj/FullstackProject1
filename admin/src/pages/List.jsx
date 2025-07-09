import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {backendUrl, currency} from '../App'
import { toast } from 'react-toastify'
function List({token}) {
  
  const [list,setlist]=useState([])
  const fetchList=async()=>{
    try{
        const response= await axios.get(`${backendUrl}/api/product/list`)
        
        if (response.data.success){
          setlist(response.data.product)
        }else{
          toast.error(response.data.message)
        }
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }
  useEffect(()=>{
    fetchList()
  },[])

  const handleRemove=async (id)=>{
    try{
        const response=await axios.delete(`${backendUrl}/api/product/remove/${id}`,{
          headers:{
            token
          }
        })
        if (response.data.success){
          fetchList()
          toast.success(response.data.message)
        }else{
          toast.error(response.data.message)
        }
    }catch(err){
      console.log(err)
      toast.error(err.message)
    }
  }
  return (
    <>
      <p className='mb-2'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/*------------------- List Table ------------------------*/}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/*----------------Product List-----------------*/}
        {
          list.map((item,index)=>(
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{currency}{item.price}</p>
              <p onClick={()=>handleRemove(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default List
