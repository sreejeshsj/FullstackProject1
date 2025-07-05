import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import {toast} from 'react-toastify'
import RelatedProduct from '../components/RelatedProduct'

function Product() {
  const {productId}=useParams()
  const {products,currency,addToCart}=useContext(ShopContext)
  const [productData,setProductData]=useState(false)
  const [image,setImage]=useState('')
  const [size,setSize]=useState('')
  const fetchProductData=async ()=>{
      products.map((item)=>{
        if (item._id===productId){
          setProductData(item)
          setImage(item.image[0])
          return null;
        }
      })
  }

  useEffect(()=>{
    fetchProductData()
   
  },[productId,products])
  
  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/*-----------------product Data-------------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*------------------ product images------------------*/}
        <div className='flex-1 flex flex-col-reverse sm:flex-row gap-3'>
            <div className='flex sm:flex-col gap-3 sm:w-[18.7%] w-full overflow-x-auto sm:overflow-y-auto'>
                {
                  productData.image.map((item,index)=>(
                    <img onClick={()=>setImage(item)} key={index} src={item} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' alt="" />
                  ))
                }
            </div>
            <div className='w-full sm:w-[80%]'>
                <img className='w-full h-auto' src={image} alt="" />
            </div>
        </div>
        {/* ----------------------------product info--------------------------- */}
                  <div className='flex-1'>
                      <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
                      <div className='flex items-center gap-1 mt-2'>
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_icon} alt="" className="w-3 5" />
                        <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                        <p className='pl-2'>(122)</p>
                      </div>
                      <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
                      <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
                      <div className='flex flex-col gap-4 my-8'>
                          <p>Select Size</p>
                          <div className='flex gap-2'>
                              {productData.sizes.map((item,index)=>(
                                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${ item===size ? 'border-orange-500' :''}`} key={index}>{item}</button>
                              ))}
                          </div>
                      </div>
                      <button onClick={()=>addToCart(productData._id,size)}  className='bg-black text-white px-8 py-3  text-sm active:bg-gray-700'>ADD TO CART</button>
                      <hr className='mt-8 sm:w-4/5' />
                      <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                              <p>100% Original Product</p>
                              <p>Cash on delivery is available on this product</p>
                              <p>Easy return exchange policy within 7 days</p>
                      </div>
                  </div>
      </div>
      {/*---------------Review Section------------------*/}
      <div className='mt-20'>
        <div className='flex'>
            <p className='border px-5 py-3 text-sm'>Description</p>
            <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
                              
                              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id commodi architecto, minima praesentium eum quidem dolore placeat veniam nisi earum laborum distinctio. Molestiae nemo quasi repellat. Tempora quibusdam officiis neque.</p>
                              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil vel laudantium natus quo pariatur culpa explicabo esse, placeat adipisci quas, sint amet obcaecati temporibus unde eum distinctio perferendis maxime ut.</p>

        </div>
      </div>
      {/*---------------Display related product-------------------*/}
      <RelatedProduct category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
