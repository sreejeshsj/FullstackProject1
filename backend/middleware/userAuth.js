import jwt from 'jsonwebtoken'


const authUser = async (req,res,next)=>{
    const {token}=req.headers
    if(!token){
        return res.json({
            success:false,
            message :'User is not authenticated ,Please Login'
        })
    }
    try{
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET)
        req.body.userId=decodeToken.id
        next()
    }catch(err){
        console.log(err)
        res.json({
            success:false,
            message:err.message
        })
    }
    
}

export default authUser