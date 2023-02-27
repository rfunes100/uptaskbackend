
import Proyecto from "../../models/Proyecto.js"
import Tarea from "../../models/Tarea.js"


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
        await tarea.deleteOne()
        res.json({msg: "Tarea eliminada"})
        
    } catch (error) {
        console.log(error)
        
    }

}



const cambiarEstado = async (req, res) => {

}

export {

    agregarTarea, 
    obtenerTarea,
    actualizaTarea,
    cambiarEstado,
    eliminarTarea
}