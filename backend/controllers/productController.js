import productModel from '../models/productModel.js'
import cloudinary from '../config/cloudinary.js'

//add product
const addProductController= async (req,res)=>{
    try{
        const {name,description,price,category,subCategory,sizes,bestSeller}= req.body

        const image1 =req.files.image1 && req.files.image1[0]
        const image2 =req.files.image2 && req.files.image2[0]
        const image3 =req.files.image3 && req.files.image3[0]
        const image4 =req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item !== undefined)

        let imageUrl = await Promise.all(
            images.map(async (item)=>{
                let result= await cloudinary.uploader.upload(item.path,{resource_type:'image'}) 
                return result.secure_url
            })
        )
        
        const product= await productModel.create({
            name,
            description,
            price:Number(price),
            category,
            subCategory,
            sizes:JSON.parse(sizes),
            bestSeller:bestSeller === 'true' ? true : false,
            image:imageUrl,
            date: Date.now()
        })
        console.log(product)

        res.json({
            success:true,
            message:"product",
            product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Something went wrong while adding new product"
        })
    }

}


//list product

const listProductController= async (req,res)=>{

    try{
        const product= await productModel.find()
        console.log(product)
        res.json({
            success:true,
            message:"Fetched Successfully",
            product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Some=thing went wrong while fetching"
        })
    }

}

//remove product
const removeProductController= async (req,res)=>{
    try{
        const id=req.params.id
        const product=await productModel.findByIdAndDelete(id)
        res.json({
            success:true,
            message:"Product is removed successfully",
            product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Something wrong while trying to delete product"
        })
    }

}

//single product info
const singleProductController= async (req,res)=>{
try{
        const id=req.params.id
        const product=await productModel.findById(id)
        res.json({
            success:true,
            message:"Product is fetched successfully",
            product
        })
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:"Something wrong while trying to fetch product"
        })
    }
}

export{
    addProductController,
    listProductController,
    removeProductController,
    singleProductController
}

