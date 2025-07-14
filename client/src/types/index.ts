import { object, string, number, boolean, type InferOutput, array } from "valibot";

export const DraftProductSchema= object({
    nombre: string(),
    precio: number(),
    stock: number(),
    stockMinimo: number()
})

export const ProductSchema= object({
    id: number(),
    nombre: string(),
    precio: number(),
    disponibilidad: boolean(),
    stock:number(),
    stockMinimo:number()
})

export const ProductsSchema= array(ProductSchema)
export type Product= InferOutput<typeof ProductSchema>