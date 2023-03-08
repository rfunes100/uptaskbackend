import  Express  from "express";
import {  registrar ,  autenticar , confirmar ,
    comprobartoken ,
    nuevopassword ,
    perfil ,
    olvidepassword } from "./controllers/usuarioController.js";
const router = Express.Router();


import checkAuth from "../middleware/checkAuth.js";


// creacion, registro confirmacion usuarios
router.post('/' , registrar)
router.post('/registrar' , registrar)
router.post('/login', autenticar )
router.get('/confirmar/:token', confirmar )
router.post('/olvide-password', olvidepassword )
router.get('/olvide-password/:token', comprobartoken)
router.post('/olvide-password/:token', nuevopassword)

router.route('/olvide-password/:token').get(comprobartoken)
.post(nuevopassword)


router.get('/perfil', checkAuth, perfil )


export default router