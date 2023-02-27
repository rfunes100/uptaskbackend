import  Express  from "express";

import { 

    obtenerTareas,
    eliminarColaborador,
    agregarColaborador,
    eliminarProyecto,
    editarProyecto,
    obtenerProyecto,
    obtenerProyectos,
    nuevoPoryecto
    }
 from "./controllers/proyectosController.js";

 import checkAuth from "../middleware/checkAuth.js";
import { autenticar } from "./controllers/usuarioController.js";

 const router = Express.Router()

 //router.get('/', checkAuth,obtenerProyectos)
 //router.post('/', checkAuth,nuevoPoryecto)

 router.route('/')
 .get( checkAuth, obtenerProyectos)
 .post( checkAuth, nuevoPoryecto)


 router.route('/:id')
 .get( checkAuth , obtenerProyecto)
 .put( checkAuth , editarProyecto)
 .delete( checkAuth, eliminarProyecto)


 router.get('/tareas/:id', checkAuth, obtenerTareas )
 router.post('/agregar-colaborador/:id', checkAuth, agregarColaborador)
 router.post('/eliminar-colaborador/:id', checkAuth, eliminarColaborador)
 

 export default router ;

 