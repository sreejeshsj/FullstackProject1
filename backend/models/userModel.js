import mongoose from "mongoose";

const UserSchema= new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimize:false})


const userModel= mongoose.models.users || mongoose.model('users',UserSchema)

export default userModel
