import Usuario from "../../models/Usuario.js"
import generarid from "../../helpers/generarid.js";
import generarjwt from "../../helpers/generarjwt.js";


import { emailRegistro , emailolvidepassword } from "../../helpers/emails.js"

const registrar = async  (req, res) => {

    // evitar duplicados
 const { email } = req.body;
 const existeusuario = await Usuario.findOne({ email})
 console.log(existeusuario)

 if(existeusuario) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({ msg: error.message});

 }

    try {
        const usuario = new Usuario(req.body)
        usuario.token = generarid() ;
         await usuario.save()
         // enviar email de confirmacion
         console.log(usuario)
         emailRegistro({
            email: usuario.email,
            nombre: usuario.nombre,
            token: usuario.token,
         })

        res.json( { msg: 'usuario creado correctamnete , Revisa tu email '})

        
    } catch (error) {
        console.log(error)
    }


}

const autenticar = async (req ,res) => {

    const {email , password } = req.body ; 

    // comprobar si exsites
    const usuario = await Usuario.findOne({email})
    console.log('usuario',usuario)
    if(!usuario){
        const error = new Error('el usuario no existe')
        return res.status(404).json({msg: error.message})


    }

    // comprobar confirmado
    if(!usuario.confirmado){
        const error = new Error('tu cuenta no ha sido confirmada')
        return res.status(403).json({msg: error.message}) 
        
        



    }

    // comprobar su paswword
    if(await usuario.comprobarPassword(password) ) {
       res.json({
        _id: usuario.id,
        nombre: usuario.nombre , 
        email: usuario.email,
        token: generarjwt(usuario._id),

       })

    }
    else{
        const error = new Error('passwod es incorrecto')
        return res.status(403).json({msg: error.message}) 
        
        

    }


}


const confirmar = async (req, res) => {

    const { token } = req.params
    const usuaioconfirmar= await Usuario.findOne({token })

    if(!usuaioconfirmar){
        const error = new Error("token no valido")
        return res.status(403).json( { msg: error.message})

    }
    try {
      //  console.log('routing dinamico', usuaioconfirmar )
        
        usuaioconfirmar.confirmado = true 
        usuaioconfirmar.token = "",
        await usuaioconfirmar.save()
        res.json({ msg: 'Usuario confirmado'})

        
    } catch (error) {
        console.log( error )
        
    }


  

}

const olvidepassword =  async (req, res) => {
    const {email} = req.body ; 

    const usuario = await Usuario.findOne({ email})
    console.log(usuario)
    if(!usuario){
        const error = new Error('el usuario no existe')
        return res.status(404).json({msg: error.message})


    }

try {
    usuario.token = generarid()
    await usuario.save();

    // enviar email 
    emailolvidepassword({
        email: usuario.email,
        nombre: usuario.nombre,
        token: usuario.token

    })


    res.json({msg: "Hemos enviado un email con las instrucciones"})
    console.log(usuario)
    
} catch (error) {
    console.log(error)
    
}


}

const comprobartoken =  async (req, res) => {
    const {token } = req.params;

    const tokenvalido = await Usuario.findOne({token});

    if(tokenvalido)
    {
  res.json({ msg: "toekn valido y usuario existe"})

    }
    else
    {
        const error = new Error('token invalido')
        return res.status(404).json({msg: error.message})

    }


    
}





const nuevopassword =  async (req, res) => {
    const {token} = req.params 
    const {password } = req.body;


    console.log(token ,  password)

    const tokenvalido = await Usuario.findOne({token});

    if(tokenvalido)
    {
        tokenvalido.password = password;
        tokenvalido.token = '';
        try {
            await tokenvalido.save()
            res.json({msg: 'password modficado correctamente'})
            
        } catch (error) {
            console.log(error)
            
        }

    }
    else
    {
        const error = new Error('token invalido')
        return res.status(404).json({msg: error.message})

    }

}


const perfil = async  ( req, res ) => {
    console.log('desde perfil')

    const { usuario } = req

    res.json(usuario)



}

export { 
    registrar,
    autenticar, 
    confirmar,
    olvidepassword,
    comprobartoken,
    nuevopassword,
    perfil

}
