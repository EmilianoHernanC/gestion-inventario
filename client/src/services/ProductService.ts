import { DraftProductSchema, ProductsSchema, ProductSchema, type Product } from "../types"
import { safeParse, number, parse, pipe, transform, string} from 'valibot'
import axios from "axios"
import { toBoolean } from "../utils";

type productData= {
    [k: string]: FormDataEntryValue;
}

export async function addProduct(data : productData) {
    try {
        console.log('Datos recibidos:', {
            nombre: data.nombre,
            precio: +data.precio,
            stock: +data.stock,
            stockMinimo: +data.stockMinimo
        })
        const result= safeParse(DraftProductSchema, ({
            nombre: data.nombre,
            precio: +data.precio,
            stock: +data.stock,
            stockMinimo: +data.stockMinimo
        }))
        console.log('Resultado del parseo:', result)
        if(result.success){
            const url= `${import.meta.env.VITE_API_URL}/api/products`
            await axios.post(url, {
                nombre: result.output.nombre,
                precio: result.output.precio,
                stock: result.output.stock,
                stockMinimo: result.output.stockMinimo
            })

        }else {
            throw new Error('Datos no Validos')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProduct() {

    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products`
        const{ data }= await axios(url)
        const result= safeParse(ProductsSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un Error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getProductByID(id : Product['id']) {

    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        const{ data }= await axios(url)
        const result= safeParse(ProductSchema, data.data)
        if(result.success){
            return result.output
        }else{
            throw new Error('Hubo un Error')
        }
    } catch (error) {
        console.log(error)
    }
}

export async function updateProduct( data : productData, id : Product['id'] ) {
    try {
        const numberSchema = pipe(
            string(), // Primero le decimos que es un string
            transform((input) => Number(input)), // Lo transformamos a número
            number() // Validamos que sea número
        );
        const result= safeParse(ProductSchema, {
            id,
            nombre: data.nombre,
            precio: parse(numberSchema, data.precio),
            disponibilidad: toBoolean(data.disponibilidad.toString())
        })

        if(result.success){
            const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
            await axios.put(url, result.output)

        }
    } catch (error) {
        console.log(error)
    }
}

export async function deleteProduct(id : Product['id']){
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.delete(url)
    } catch (error) {
        console.log(error)
    }

}

export async function updateProductAvailability(id : Product['id']){
    try {
        const url= `${import.meta.env.VITE_API_URL}/api/products/${id}`
        await axios.patch(url)
    } catch (error) {
        console.log(error)
    }
}