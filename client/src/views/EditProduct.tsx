import { Link, Form, useActionData, useLoaderData, redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { getProductByID, updateProduct } from "../services/ProductService"
import type { Product } from "../types"
import ProductForm from "../components/ProductForm"

export async function loader({params} : LoaderFunctionArgs) {
    if(params.id !== undefined){
        const product= await getProductByID(+params.id)
        if(!product){
            return redirect('/')
        }
        return product
    }
    return{}
}

export async function action({request, params} : ActionFunctionArgs){
    const data= Object.fromEntries(await request.formData())
    
    let error= ''
    if(Object.values(data).includes('')){
        error= 'Todos los campos son obligatorios'
    }
    
    if(error.length){
        return error
    }
    
    if(params.id !== undefined){
        await updateProduct(data, +params.id)
        return redirect('/')
    }
}

const availabilityOptions = [
    { name: 'Disponible', value: true},
    { name: 'No Disponible', value: false}
]

export default function EditProduct() {
    const product= useLoaderData() as Product
    const error= useActionData() as string

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Header con patrón de fondo */}
            <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-blue-900 dark:from-blue-800 dark:via-gray-900 dark:to-blue-800 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Icono de motocicleta */}
                            <div className="flex items-center justify-center w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.72 2.03c.86-.3 1.66-.45 2.45-.45 1.16 0 2.26.26 3.23.73l-.73 1.93c-.69-.33-1.45-.51-2.25-.51-.52 0-1.01.09-1.47.24l-.23-1.94zm-1.44 0l-.23 1.94c-.46-.15-.95-.24-1.47-.24-.8 0-1.56.18-2.25.51l-.73-1.93c.97-.47 2.07-.73 3.23-.73.79 0 1.59.15 2.45.45zM5.5 6C3.01 6 1 8.01 1 10.5S3.01 15 5.5 15 10 12.99 10 10.5 7.99 6 5.5 6zm13 0c-2.49 0-4.5 2.01-4.5 4.5s2.01 4.5 4.5 4.5S23 12.99 23 10.5 20.99 6 18.5 6zm-13 2c1.38 0 2.5 1.12 2.5 2.5S6.88 13 5.5 13 3 11.88 3 10.5 4.12 8 5.5 8zm13 0c1.38 0 2.5 1.12 2.5 2.5s-1.12 2.5-2.5 2.5S16 11.88 16 10.5 17.12 8 18.5 8z"/>
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Editar Producto</h1>
                                <p className="text-blue-200 dark:text-blue-300 mt-1">Actualiza la información del repuesto</p>
                            </div>
                        </div>
                        
                        <Link
                            to={"/"}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-900 dark:text-blue-800 bg-white dark:bg-gray-100 hover:bg-blue-50 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Volver a Productos
                        </Link>
                    </div>
                </div>
            </div>

            {/* Contenido principal */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {error && (
                    <div className="mb-8">
                        <ErrorMessage>{error}</ErrorMessage>
                    </div>
                )}
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden transition-colors duration-300">
                    <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-600">
                        <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-600 dark:bg-blue-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Información del Producto</h2>
                        </div>
                    </div>
                    
                    <Form className="p-8 space-y-8" method="POST">
                        <ProductForm product={product} />
                        
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3" htmlFor="disponibilidad">
                                Disponibilidad
                            </label>
                            <select 
                                id="disponibilidad"
                                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm hover:border-gray-400 dark:hover:border-gray-500"
                                name="disponibilidad"
                                defaultValue={product?.disponibilidad.toString()}
                            >
                                {availabilityOptions.map(option => (
                                    <option key={option.name} value={option.value.toString()}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Guardar Cambios
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}