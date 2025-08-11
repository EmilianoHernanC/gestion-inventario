import { deleteProduct } from "../services/ProductService"
import type { Product } from "../types"
import { formatCurrency } from "../utils"
import { Form, Link, redirect, useFetcher, useNavigate, type ActionFunctionArgs } from "react-router-dom"


type ProductDetailProps= {
    product: Product
}

export async function action({params} : ActionFunctionArgs){
   if(params.id !== undefined){
        await deleteProduct(+params.id)
        return redirect('/')
   }
}

export default function ProductDetail({product}: ProductDetailProps) {
    const fetcher= useFetcher()
    const navigate= useNavigate()
    const isAvailable= product.disponibilidad

    return (
        <tr className="border-b border-gray-200  transition-colors duration-200">
            <td className="px-6 py-4">
                <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gradient-to-r from-slate-800 to-slate-900 rounded-lg flex items-center justify-center shadow-md">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                            <Link
                                to={`/stock/${product.id}`}
                            >
                                {product.nombre}
                            </Link>
                        </div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                            ID: {product.id}
                        </div>
                    </div>
                </div>
            </td>
            
            
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {formatCurrency(product.precio)}
                    </span>
                </div>
            </td>

            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {product.stock}
                    </span>
                </div>
            </td>

            
            
            <td className="px-6 py-4">
                <fetcher.Form method="POST">
                    <button
                        type="submit"
                        name='id'
                        value={product.id}
                        className={`inline-flex items-center px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 shadow-sm hover:shadow-md ${
                            isAvailable 
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-green-200' 
                                : 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-red-200'
                        }`}
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAvailable ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"} />
                        </svg>
                        {isAvailable ? 'Disponible' : 'Agotado'}
                    </button>
                </fetcher.Form>
            </td>
            
            <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                    <button 
                        onClick={() => navigate(`/productos/${product.id}/editar`)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Editar
                    </button>

                    <Form
                        method="POST"
                        action={`productos/${product.id}/eliminar`}
                        onSubmit={(e) => {
                            if(!confirm('¿Estás seguro de eliminar este producto?')){
                                e.preventDefault()
                            }
                        }}
                    >
                        <input 
                            type="submit" 
                            value='Eliminar'
                            className='inline-flex items-center px-3 py-2 border border-red-300 rounded-lg text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 hover:border-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md'
                        />
                    </Form>
                </div>
            </td>
        </tr> 
    )
}