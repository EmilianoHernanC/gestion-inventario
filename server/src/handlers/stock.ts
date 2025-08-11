import { Sequelize, Op } from 'sequelize';
import Producto from '../models/Product.model'
import Stock from '../models/Stock.model'
import {Request, Response} from 'express'

export const listarMovimientos= async (req: Request, res: Response) =>{
    try {
        const movimientos= await Stock.findAll({
            include:{
                model: Producto,
                attributes: ['id', 'nombre', 'precio']
            },
            order:[['fecha', 'DESC']]
        });

        res.status(200).json(movimientos);
    } catch (error) {
        console.log(error)
    }
}

export const crearMovimiento = async (req: Request, res: Response): Promise<void> => {
    try {
        // Obtengo datos del body
        const { productId, tipo, cantidad, motivo } = req.body;

        // Verifico que haya algo
        const producto = await Producto.findByPk(productId);
        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        // Obtengo el stock anterior
        const stockAnterior = producto.stock || 0;
        let stockNuevo = stockAnterior;

        // logica segun el tipo de movimiento
        if (tipo === 'entrada') {
            stockNuevo += cantidad;
        } else if (tipo === 'salida') {
            stockNuevo -= cantidad;
            if (stockNuevo < 0) stockNuevo = 0; // evitar stock negativo
        } else if (tipo === 'ajuste') {
            stockNuevo = cantidad; // En ajuste podés asumir que "cantidad" es el nuevo valor directo
        } else {
            res.status(400).json({ error: 'Tipo de movimiento inválido' });
            return;
        }

        // Crea el movimiento que hicimos, de entrada, salida, etc
        const movimiento = await Stock.create({
            productId,
            tipo,
            cantidad,
            stockAnterior,
            stockNuevo,
            motivo,
            fecha: new Date()
        });

        // Actualizamos el producto
        producto.stock = stockNuevo;
        producto.fechaModificacion = new Date();
        await producto.save();

        res.status(201).json(movimiento);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export const movimientosPorProducto= async(req: Request, res:Response): Promise<void> =>{
    try {
        const{ productId }= req.params
        const id = Number(productId)

        const producto= await Producto.findByPk(id)

        if(!producto){
           res.status(404).json({error: 'Producto no Existe'})
        }

        const movimientos= await Stock.findAll({
            where: {
                productId: id
            },
            order:[['fecha', 'DESC']]
        })

        res.status(200).json({ data: movimientos })
    } catch (error) {
        console.log(error)
    }
}

export const getAlertas= async(req:Request, res:Response) => {
    try {
        const productos= await Producto.findAll({
            where:{
                stock:{[Op.lt]:Sequelize.col('stockMinimo')}
            }
        })

        res.status(200).json({data: productos})
    } catch (error) {
        console.log(error)
    }
}