import express from "express";
import productRouter from "./router/productRouter";
import stockRouter from "./router/stockRouter";
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec from "./config/swagger";
import db from "./config/db";

//Conectar la Base de Datos
export async function ConectarDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.blue.bold('Conexion exitosa a la base de datos'))
    } catch (error) {
        console.log(error)
        console.log(colors.red.bold('Hubo un error en la conexion a la DB'))
    }
} 

ConectarDB()
//Instancia de express
const server= express()


//Permitir conexiones
const corsOptions : CorsOptions= {
    origin: function(origin, callback){
        // Permitir requests sin origin (Thunder Client, Postman, etc.)
        if(!origin) return callback(null, true);
        
        // Permitir requests desde tu frontend
        if(origin === process.env.FRONTEND_URL){
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos desde un formulario JSON
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', productRouter)
server.use('/api/stock', stockRouter)


//Docs
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec))

export default server