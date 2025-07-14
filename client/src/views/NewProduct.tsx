import { Link, Form, useActionData, redirect, type ActionFunctionArgs } from "react-router-dom"
import ErrorMessage from "../components/ErrorMessage"
import { addProduct } from "../services/ProductService"
import ProductForm from "../components/ProductForm"

export async function action({request} : ActionFunctionArgs){
    const data= Object.fromEntries(await request.formData())
    
    let error= ''
    if(Object.values(data).includes('')){
        error= 'Todos los campos son obligatorios'
    }
    
    if(error.length){
        return error
    }
    
    await addProduct(data)
    return redirect('/')
}

export default function NewProduct() {
    const error= useActionData() as string

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Header con patrón de fondo */}
            <div className="bg-gradient-to-r from-green-900 via-slate-900 to-green-900 dark:from-green-800 dark:via-gray-900 dark:to-green-800 shadow-2xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Icono de agregar producto */}
                            <div className="flex items-center justify-center w-12 h-12 bg-green-600 dark:bg-green-500 rounded-xl shadow-lg">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">Nuevo Producto</h1>
                                <p className="text-green-200 dark:text-green-300 mt-1">Registra un nuevo repuesto en el inventario</p>
                            </div>
                        </div>
                        
                        <Link
                            to={"/"}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-green-900 dark:text-green-800 bg-white dark:bg-gray-100 hover:bg-green-50 dark:hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 transition-all duration-200 shadow-lg hover:shadow-xl"
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
                            <div className="w-8 h-8 bg-green-600 dark:bg-green-500 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Información del Producto</h2>
                        </div>
                    </div>
                    
                    <Form className="p-8 space-y-8" method="POST">
                        <div className="grid grid-cols-1 gap-6">
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 transition-colors duration-300">
                                <div className="flex items-center space-x-2 mb-2">
                                    <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h3 className="font-medium text-blue-900 dark:text-blue-200">Información</h3>
                                </div>
                                <p className="text-sm text-blue-800 dark:text-blue-300">
                                    Completa todos los campos requeridos para registrar el nuevo repuesto en el sistema.
                                </p>
                            </div>
                        </div>
                        
                        <ProductForm />
                        
                        <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 dark:from-green-500 dark:to-green-600 dark:hover:from-green-600 dark:hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 dark:focus:ring-offset-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Registrar Producto
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    )
}