import { Router } from "express";
import { listarMovimientos, crearMovimiento, movimientosPorProducto, getAlertas } from "../handlers/stock";
import { param, body } from "express-validator";
import { handleInputErrors } from "../middleware";

const stockRouter= Router()

stockRouter.get('/', listarMovimientos)
stockRouter.post('/',
    body('productId')
      .isInt({ gt: 0 }).withMessage('El ID del producto debe ser un entero positivo'),

    body('tipo')
      .isIn(['entrada', 'salida', 'ajuste']).withMessage('Tipo inválido: debe ser entrada, salida o ajuste'),

    body('cantidad')
      .isFloat({ gt: 0 }).withMessage('La cantidad debe ser un número mayor a cero'),

    body('motivo')
      .optional()
      .isString().withMessage('El motivo debe ser un texto'),

    handleInputErrors,
    crearMovimiento
),

stockRouter.get('/products/:productId',
    param('productId')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    movimientosPorProducto
)

stockRouter.get('/alertas', getAlertas)

export default stockRouter;