import Proyecto from "../../models/Proyecto.js"
import Tarea from "../../models/Tarea.js";


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find()
    .where("creador").equals(req.usuario)

    res.json(proyectos);

}

const nuevoPoryecto = async (req, res) => {
    console.log(req.body)

    const proyecto = new Proyecto(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoalmacenado = await proyecto.save()
        res.json(proyectoalmacenado)
        
    } catch (error) {
        console.log(error)
        
    }
}


const obtenerProyecto = async (req, res) => {
    const {id} = req.params 
    console.log(id)

    const proyecto = await Proyecto.findById(id)

    if(!proyecto) {
      
        const error = new Error('no encontrado')
        return res.status(404).json({ msg: error.message});
    }
    

    if(proyecto.creador.toString() !==  req.usuario._id.toString() ) {
        const error = new Error('no tienes permisos')
        return res.status(401).json({ msg: error.message});

    }


    
    const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)
    

res.json({ proyecto,
     tareas
    })

}


const editarProyecto = async (req, res) => {


    const {id} = req.params 
   // console.log(id)

    const proyecto = await Proyecto.findById(id)

    if(!proyecto) {
      
        const error = new Error('no encontrado')
        return res.status(402).json({ msg: error.message});
    }

    
    if(proyecto.creador.toString() !==  req.usuario._id.toString() ) {
        const error = new Error('no tienes permisos')
        return res.status(401).json({ msg: error.message});

        
    }

    proyecto.nombre = req.body.nombre ||  proyecto.nombre 
    proyecto.descripcion = req.body.descripcion ||  proyecto.descripcion 
    proyecto.fechaentrega = req.body.fechaentrega ||  proyecto.fechaentrega 
    proyecto.cliente = req.body.cliente ||  proyecto.cliente 

    try {
        const proyectoalmacenado = await proyecto.save()
        
    res.json(proyectoalmacenado)

        
    } catch (error) {
    console.log(error)
        
    }

    


}


const eliminarProyecto = async (req, res) => {

    const {id} = req.params 
    // console.log(id)
 
     const proyecto = await Proyecto.findById(id)
 
     if(!proyecto) {
       
         const error = new Error('no encontrado')
         return res.status(402).json({ msg: error.message});
     }
 
     
     if(proyecto.creador.toString() !==  req.usuario._id.toString() ) {
         const error = new Error('no tienes permisos')
         return res.status(401).json({ msg: error.message});
 
         
     }

     try {

        await Proyecto.deleteOne()
        res.json({ msg: "proyecto eliminado"})

        
     } catch (error) {
        console.log(error)
        
     }


}


const agregarColaborador = async (req, res) => {
}


const eliminarColaborador = async (req, res) => {
}

const obtenerTareas = async (req, res) => {
    const {id} = req.params 

    const existeproyecto = await Proyecto.findById(id)

    if(!existeproyecto) {
        const error = new Error('no encontrado')
        return res.status(402).json({ msg: error.message});
    }

    const tareas = await Tarea.find().where('proyecto').equals(id)
res.json(tareas)
    


}


export {
    obtenerTareas,
    eliminarColaborador,
    agregarColaborador,
    eliminarProyecto,
    editarProyecto,
    obtenerProyecto,
    obtenerProyectos,
    nuevoPoryecto
}
