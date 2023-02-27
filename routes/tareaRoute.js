import  Express  from "express";


import checkAuth from "../middleware/checkAuth.js";


import {
    agregarTarea, 
    obtenerTarea,
    actualizaTarea,
    cambiarEstado,
    eliminarTarea

} from './controllers/tareaController.js'


const router = Express.Router();

router.post('/',checkAuth,  agregarTarea)

router.route('/:id')
.get( checkAuth, obtenerTarea)
.put(checkAuth, actualizaTarea)
.delete(checkAuth, eliminarTarea)

router.post('/estado/:id', cambiarEstado)


export default router