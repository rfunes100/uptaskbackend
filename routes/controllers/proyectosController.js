import Proyecto from "../../models/Proyecto.js"
import Tarea from "../../models/Tarea.js";
import Usuario from "../../models/Usuario.js";


const obtenerProyectos = async (req, res) => {
    const proyectos = await Proyecto.find({
        '$or': [
            {'colaborado': { $in: req.Usuario }},
            {'creador': { $in: req.Usuario }}

        ]
    })
    .select("-tareas")

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

    const proyecto = await Proyecto.findById(id).populate('tareas')
    .populate('colaborado' ,"nombre email  ")


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


const buscarColaborador = async (req, res) => {
    console.log(req.body )
    const { email } = req.body

    const usuario = await Usuario.findOne({email}).
    select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario) {
        const error = new Error('usuario no encontrado')
        return res.status(404).json({ msg: error.message});
    }

    res.json(usuario)


}



const agregarColaborador = async (req, res) => {
    console.log(req.params.id)

    const proyecto = await Proyecto.findById(req.params.id)

    if (!proyecto) { 
        const error = new Error('proyect no encontrado')
        return res.status(404).json({ msg: error.message});
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('accion no valida')
        return res.status(404).json({ msg: error.message});
    }

    const { email } = req.body

    const usuario = await Usuario.findOne({email}).
    select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario) {
        const error = new Error('usuario no encontrado')
        return res.status(404).json({ msg: error.message});
    }

    // el colaborador no es el admin 
    if(proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('el creador del proyeto no puede ser colaborador')
        return res.status(404).json({ msg: error.message});

    }

    // revisar que no esta agregado al proyecto
    if(proyecto.colaborado.includes(usuario._id)) {
        const error = new Error('el usuario ya pertenece al proyecto')
        return res.status(404).json({ msg: error.message});

    }

    proyecto.colaborado.push(usuario._id)
    await proyecto.save() 
    res.json({ msg: 'colbaraodr agregado correctamente' })




}


const eliminarColaborador = async (req, res) => {
 
    console.log(req.params.id)

    const proyecto = await Proyecto.findById(req.params.id)

    if (!proyecto) { 
        const error = new Error('proyect no encontrado')
        return res.status(404).json({ msg: error.message});
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString() ) {
        const error = new Error('accion no valida')
        return res.status(404).json({ msg: error.message});
    }

 
    proyecto.colaborado.pull(req.body.id)
    await proyecto.save() 
    res.json({ msg: 'colbaraodr eliminado correctamente' })



  

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
    nuevoPoryecto,
    buscarColaborador
}
