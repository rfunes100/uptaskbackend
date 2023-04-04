//const express = require("express")

import express from 'express'
import dotenv from 'dotenv' 
 import cors from 'cors'
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
//const whitelist = [ "'*'", "http://localhost:5173", "http://localhost:4000", "https://uptaskbackendexp.azurewebsites.net" ]

/*
const whitelist = ["http://127.0.0.1:4000"]
const corsOptions = {
    origin: function(origin, calllback) {
        console.log('origin', origin)

        if(whitelist.includes(origin)) {
            console.log('origin', origin)
            // puede consultar la api
            calllback(null, true)

        } else {
            // no esta permitido
            calllback(new Error('Error de cors'))

        }
    }
}*/


const corsOptionspla =

{
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }



app.use(cors(corsOptionspla) );


// routing 
app.use('/api/usuarios', usuarioRoutes );
app.use('/api/proyectos', proyectosroutes );
app.use('/api/tarea', tareaRoute );




const PORT = process.env.PORT || 4000

 const servidor = app.listen(PORT , () => {
    console.log(`servidor corriendo en el puerto ${PORT}`)
});

// socket io 
import { Server  } from 'socket.io';

const io = new Server(servidor, {
 pingTimeout: 60000 ,
})

io.on('connection', (socket) => {
    console.log('conectado a socket io')

    // eventos de socket io 
    socket.on('prueba', (proyectos) => {
        console.log('desde socket io', proyectos)

    })

    socket.emit('respuesta', { nombre: 'ritchie'})


})