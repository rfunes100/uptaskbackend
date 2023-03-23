import mongoose from "mongoose";

const proyectoschema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true, 
        required: true ,
    },
    descripcion: {
        type: String,
        trim: true, 
        required: true ,
    },
    fechaentrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true, 
        required: true ,
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Usuario"

       
    },
    tareas: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tarea"

        }

    ],
    colaborado: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Usuario"

        }

    ],


}, {
    timestamps: true,
})

const Proyecto = mongoose.model('Proyecto', proyectoschema )
 
export default Proyecto;