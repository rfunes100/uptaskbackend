
import  Jwt  from "jsonwebtoken"
import Usuario from "../models/Usuario.js"

const checkAuth = async (req , res , next) => {

    let token 
console.log( req.headers.authorization)
if( req.headers.authorization &&
     req.headers.authorization.startsWith('Bearer') )
{
    try {
     token = req.headers.authorization.split(' ')[1]
    // console.log( token)

     const decoded = Jwt.verify(token, process.env.JWT_SECRET)
    // console.log( decoded)

     req.usuario = await Usuario.findById(decoded.id).select(
        "-password -confirmado -token -createdAt -updatedAt -__v")
    // console.log( req.usuario)
     return next()

        
    } catch (error) {
        return res.status(404).json("msg: 'hubo un error")
        console.log(error)
        
    }

}

if(!token){
    const error = new Error('token no valido')
  return  res.status(401).json({ msg: error.message })

}


next()

}

export default checkAuth 