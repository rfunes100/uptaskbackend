
import Proyecto from "../../models/Proyecto.js"
import Tarea from "../../models/Tarea.js"
import Usuario from "../../models/Usuario.js";



const agregarTarea = async (req, res) => {
    console.log(req.body)

    const {proyecto} = req.body

    const existeproyecto = await Proyecto.findById(proyecto)

  console.log(existeproyecto)

  if(!existeproyecto){
    const error = new Error('el proyecto no existe')
    return res.status(404).json({ msg: error.message})
  }

  if(existeproyecto.creador.toString() !== req.usuario._id.toString() ){
    const error = new Error('no tiene permisos')
    return res.status(404).json({ msg: error.message})
  }

  try {
    const tarealmacenada = await Tarea.create(req.body)

    existeproyecto.tareas.push(tarealmacenada._id)
    await existeproyecto.save()


    res.json(tarealmacenada)

    
  } catch (error) {
    console.log(error)
    
  }


}

const obtenerTarea = async (req, res) => {
    const {id} = req.params

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        const error = new Error(' tarea no encontrada')
        return res.status(404).json({ msg: error.message})

    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('no tiene permisos para ver')
        return res.status(403).json({ msg: error.message})

    }


    res.json(tarea)
  

}

const actualizaTarea = async (req, res) => {

    const {id} = req.params
    console.log(id)


    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        const error = new Error(' tarea no encontrada')
        return res.status(404).json({ msg: error.message})

    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('no tiene permisos para ver')
        return res.status(403).json({ msg: error.message})

    }

    tarea.nombre = req.body.nombre ||  tarea.nombre
    tarea.descripcion = req.body.descripcion ||  tarea.descripcion
    tarea.prioridad = req.body.prioridad ||  tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega ||  tarea.fechaEntrega
    
try {
    const tarealmacenada = await tarea.save()
    res.json(tarealmacenada)
    
} catch (error) {
    console.log(error)
    
}


}


const eliminarTarea = async (req, res) => {

    const {id} = req.params
    console.log(id)


    const tarea = await Tarea.findById(id).populate("proyecto")

    if(!tarea) {
        const error = new Error(' tarea no encontrada')
        return res.status(404).json({ msg: error.message})

    }

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('no tiene permisos para ver')
        return res.status(403).json({ msg: error.message})

    }

    try {

        const proyecto = await Proyecto.findById(tarea.proyecto)
        proyecto.tareas.pull(tarea._id);


        await Promise.allSettled([ await proyecto.save() , await tarea.deleteOne()])

        res.json({msg: "Tarea eliminada"})


        
    } catch (error) {
        console.log(error)
        
    }

}



const cambiarEstado = async (req, res) => {

    
    const {id} = req.params
    console.log(id)


    const tarea = await Tarea.findById(id).populate("proyecto")

    const { email } = req.body

    const usuario = await Usuario.findOne({email}).
    select('-confirmado -createdAt -password -token -updatedAt -__v')

    

    console.log(tarea)
    if(!tarea) {
        const error = new Error(' tarea no encontrada')
        return res.status(404).json({ msg: error.message})

    }

    


    // el colaborador no es el admin 
    if(tarea.proyecto.creador.toString() !== usuario._id.toString() && 
    !tarea.proyecto.colaborado.some( colaborador=> colaborador._id.toString() === usuario._id.toString()  )  ) {
        const error = new Error('no tiene accesos')
        return res.status(404).json({ msg: error.message});

    }

    tarea.estado =  !tarea.estado
    await tarea.save()
    res.json(tarea)


    
}

export {

    agregarTarea, 
    obtenerTarea,
    actualizaTarea,
    cambiarEstado,
    eliminarTarea
}