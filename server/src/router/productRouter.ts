import { Router } from "express";
import { actualizarDisponibilidad, actualizarProducto, createProduct, eliminarProducto, getProducto, getProductoById } from "../handlers/producto";
import { body, param } from 'express-validator'
import { handleInputErrors } from "../middleware";

const productRouter= Router()
/** 
 * @swagger
 * components:
 *   schemas:
 *      product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The product name
 *                  example: Correa alternador
 *              price:
 *                  type: number
 *                  description: The product price
 *                  example: 5000    
 *              availability:
 *                  type: boolean
 *                  description: The product availability
 *                  example: true
 */

productRouter.get('/', getProducto)
/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags:
 *              - Products
 *          description: Returns a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/product'
 */

productRouter.get('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    getProductoById
)

/**
 * @swagger
 *  /api/products/{id}:
 *      get:
 *          summary: Get product by ID
 *          tags:
 *              - Products
 *          description: Returns a product based on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: ID of the product you want to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200: 
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              
 *              404:
 *                  description: Not found
 *              400:
 *                  description: Bad Request - Invalid ID
 * 
 */

productRouter.post('/', 
    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('precio')
        .isNumeric().withMessage('Debe ser un numero')
        .notEmpty().withMessage('El Precio es obligatorio')
        .custom(value => {
        if (value <= 0) {
            throw new Error('Precio no valido')
        }
        return true
        }),
    handleInputErrors,
    createProduct
)

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new Product
 *          tags:
 *              - Products
 *          description: Returns a new record in the database
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Correa Alternador"
 *                              prince:
 *                                  type: number
 *                                  example: 5000
 *          responses:
 *              201:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400:
 *                  description: Bad Request - Invalid input Data
 */

productRouter.put('/:id',
    param('id')
        .isInt().withMessage('ID no valido'),
    body('nombre')
        .notEmpty().withMessage('El nombre del producto es obligatorio'),
    body('precio')
        .isNumeric().withMessage('Debe ser un numero')
        .notEmpty().withMessage('El Precio es obligatorio')
        .custom(value => {
        if (value <= 0) {
            throw new Error('Precio no valido')
        }
        return true
        }),
    body('disponibilidad')
        .isBoolean().withMessage('Valor para disponibilidad no Valido'),
    handleInputErrors,
    actualizarProducto
)

/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *                - in: path
 *                  name: id
 *                  description: ID of the product you want to retrieve
 *                  required: true
 *                  schema:
 *                      type: integer
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "Correa Alternador"
 *                              prince:
 *                                  type: number
 *                                  example: 5000
 *                              availability:
 *                                  type: boolean
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400:
 *                  description: Bad Request - Invalid ID or Invalid input Data
 *              404:
 *                  description: Product not Found
 * 
 */

productRouter.patch('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    actualizarDisponibilidad
)

/**
 * @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Update product Availability
 *          tags:
 *              - Products
 *          description: Returns de updated availability
 *          parameters:
 *                - in: path
 *                  name: id
 *                  description: ID of the product you want to retrieve
 *                  required: true
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product not Found
 *                      
 * 
 */

productRouter.delete('/:id', 
    param('id')
        .isInt().withMessage('ID no valido'),
    handleInputErrors,
    eliminarProducto
)
/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Deletes a product by a given id
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *                - in: path
 *                  name: id
 *                  description: ID of the product you want to delete
 *                  required: true
 *                  schema:
 *                      type: integer
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: 'Producto Eliminado'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product not Found
 */

export default productRouter