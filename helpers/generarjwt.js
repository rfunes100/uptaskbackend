import  Jwt  from "jsonwebtoken";

const generarjwt = (id ) => {
    return Jwt.sign( {id} , process.env.JWT_SECRET, {
        expiresIn: "30d",
  }  ) ;


}

export default generarjwt 

