import { Sequelize } from 'sequelize-typescript'
import Producto from '../models/Product.model'
import Stock from '../models/Stock.model'
import dotenv from 'dotenv'
dotenv.config()

const db= new Sequelize(process.env.DATABASE_URL!, {
    models:[Producto, Stock],
    logging:false
})

export default db