//const express = require("express")

import express from 'express'
import dotenv from 'dotenv' 
// import cors from 'cors'
import conectardb from './config/db.js'
import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectosroutes from './routes/proyectosroutes.js'
//import tareaRoute from './routes/tareaRoute.js'
import tareaRoute from './routes/tareaRoute.js'



const app = express()
app.use(express.json())



dotenv.config()

conectardb();

// configurar cors
/*const whitelist = ['http://localhost:5173/']

const corsOptions = {
    origin: function(origin, calllback) {
        if(whitelist.includes(origin)) {
            // puede consultar la api
            calllback(null, true)

        } else {
            // no esta permitido
            calllback(new Error('Error de cors'))

        }
    }
}
app.use(cors(corsOptions) );
*/

// routing 
app.use('/api/usuarios', usuarioRoutes );
app.use('/api/proyectos', proyectosroutes );
app.use('/api/tarea', tareaRoute );





const PORT = process.env.PORT || 4000

app.listen(PORT , () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});

