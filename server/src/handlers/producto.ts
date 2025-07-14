import { Request, RequestHandler, Response } from 'express' 
import Producto from '../models/Product.model'



export const getProducto: RequestHandler=  async(req:Request, res:Response) => {

    const productos= await Producto.findAll({
        order:[['id', 'DESC']],
        attributes:{exclude:['createdAt', 'updatedAt']}
    })
    res.json({data: productos})
}

export const getProductoById : RequestHandler= async(req:Request, res:Response) => {

    const { id }= req.params
    const producto= await Producto.findByPk(id)

    if(!producto){
        res.status(404).json({
            error:'Producto no encontrado'
        })
    }

    res.json({data: producto})
}

export const createProduct: RequestHandler = async(req: Request, res: Response) => {

    //Creamos nuestro objeto
	const product= await Producto.create(req.body)
	res.status(201).json({data: product})
}

export const actualizarProducto: RequestHandler= async(req: Request, res:Response) =>{
    //Verificamos que el producto exista

    const {id}= req.params
    const producto= await Producto.findByPk(id)

    if(!producto){
        res.status(404).json({
            error:'Producto no Encontrado'
        })
    }

    //Actualizar
    await producto.update(req.body)
    //Almacenamos en BD
    await producto.save()

    res.json({data:producto})

}

export const actualizarDisponibilidad = async(req:Request, res:Response) =>{

    const { id } = req.params
    const producto= await Producto.findByPk(id)

    if(!producto){
        res.status(404).json({
            error:'Producto no Encontrado'
        })
    }

    producto.disponibilidad= !producto.dataValues.disponibilidad
    await producto.save()

    res.json({data:producto})
}

export const eliminarProducto: RequestHandler= async(req:Request, res:Response) =>{
    const {id} = req.params
    const producto= await Producto.findByPk(id)

    if(!producto){
        res.status(404).json({
            error:'Producto no Encontrado'
        })
    }

    await producto.destroy()
    res.json({data: 'Producto Eliminado'})
}
