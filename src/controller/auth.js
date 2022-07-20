
const jwt= require("jsonwebtoken")
const {promisify}=require("util")

async function auth(req,res,next){
        
    let token=req.cookies
       

        if (!token.validacion) {
            res.send({message:"es necesario un token para continuar"})
        }else{
                try {
                    
                    jwt.verify(token.validacion, "secret")
                    
                    next()
                    
                } catch (error) {
                    
                    res.send("el token no valido o inexistente ")
                }
            
            
            }
        
                  
       

        

        






        
            
     

}

module.exports= auth;