import mongoose from "mongoose";


const connectToDB= async ()=>{
    
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/ecom`)
        console.log('Database is connected successfully')
    }catch(err){
        console.log('Database is not conneted',err)
    }
    
 
  
  
}

export default connectToDB