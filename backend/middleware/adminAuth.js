import jwt from 'jsonwebtoken'


const authAdminMiddleware=async (req,res,next)=>{
    try{
       const {token}= req.headers
       
       if (!token){
        return res.json({
            success:false,
            message:"invalid admin login "
        })
       }
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET)
        console.log("Decode",decodedToken)
        if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({
            success:false,
            message:"invalid admin login "
        })
        }
        next()
      
    }catch(err){
        console.log("Something went wrong while trying to admin login",err)
        return res.json({
            success:false,
            message:"invalid admin login "
        })
    }
}

export default authAdminMiddleware