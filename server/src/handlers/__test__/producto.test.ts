import  request  from "supertest";
import server from "../../server";
import { response } from "express";

describe('POST /api/products', () => {
    //Validamos los errores de validacion
    it('Deberia enviar errores de Validacion', async() =>{
        const response= await request(server).post('/api/products').send({}) //Vacio para que salten los errores

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(3)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('El valor del precio debe ser un numero y debe ser mayor que 0', async() => {
        const response= await request(server).post('/api/products').send(  {
          "nombre": "Correa alternador - testing",
          "precio": "hola"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(3)
    })


    it('Deberia crear un nuevo producto', async() => {
        const response= await request(server).post('/api/products').send({
            nombre: "Correa alternador - Testing",
            precio: 14500,
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
        
    })
})

describe('GET /api/products', () => {
    it('Deberia mirar si api/url existe', async() => {
        const response= await request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    })

    it('GET a json response with products', async() => {
        const response= await request(server).get('/api/products')

        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)

        expect(response.status).not.toBe(201)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('GET /api/products/:id', () => {
    it('debe regresar un 404 por un producto no existente', async() => {
        const productoID= 2000
        const response= (await request(server).get(`/api/products/${productoID}`))

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe('Producto no encontrado')
        expect(response.status).not.toBe(400)
    })

    it('Deberia revisar que el ID de la url sea valido', async() =>{
        const response= (await request(server).get(`/api/products/not-valid-url`))

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
        expect(response.body.errors).toHaveLength(1)
    })

    it('Devuelve un json de un producto existente', async() =>{
        const response= (await request(server).get(`/api/products/1`))

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

    })
})

describe('PUT /api/products/:id', () => {

    it('Deberia revisar que el ID de la url sea valido', async() =>{
        const response= await request(server).put('/api/products/not-valid-url').send({
            nombre: 'Filtro de aceite para moto 150cc - test',
            disponibilidad: true,
            precio: 300
        }) 

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
        expect(response.body.errors).toHaveLength(1)
    })


    it('Deberia mostrar los mensajes de validacion cuando se actualiza un producto', async() =>{
        const response= await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(4)

        expect(response.body).not.toHaveProperty('data')
        expect(response.status).not.toBe(200)

    })

    it('Validamos que el precio sea mayor a 0', async() => {
        const response= await request(server).put('/api/products/1').send({
            nombre: 'Filtro de aceite para moto 150cc - test',
            disponibilidad: true,
            precio: 0
        }) 
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe('Precio no valido')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it('deberia devolver un 404 cuando enviamos el id de un producto que no existe', async() => {
        const productoID= 2000
        const response= await request(server).put(`/api/products/${productoID}`).send({
            nombre: 'Filtro de aceite para moto 150cc - test',
            disponibilidad: true,
            precio: 300
        }) 
        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no Encontrado')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('data')
    })

    it('deberia actualizar un producto con data valida', async() => {

        const response= await request(server).put(`/api/products/1`).send({
            nombre: 'Filtro de aceite para moto 150cc - test',
            disponibilidad: true,
            precio: 300
        }) 
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    })
})

describe('PATCH /api/products/:id', () => {
    it('Deberia enviar un 404 cuando un producto no es encontrado', async() => {
        const productoID= 2000
        const response= await request(server).patch(`/api/products/${productoID}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no Encontrado')
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('Deberia actualizar la disponibilidad de un producto', async() => {
        const response= await request(server).patch('/api/products/1')
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data.disponibilidad).toBe(false)

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

describe('DELETE /api/producto/:id', () => {
    it('Revisa que sea un ID valido', async() => {
        const response= await request(server).delete('/api/products/not-valid-url')

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe('ID no valido')
    })

    it('Revisa que mande un 404 por un producto que no existe', async() => {
        const productoID= 2000
        const response= await request(server).delete(`/api/products/${productoID}`)

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto no Encontrado')
    })

    it('Deberia eliminar un producto', async() => {
        const response= await request(server).delete('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body.data).toBe('Producto Eliminado')

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)

    })
})