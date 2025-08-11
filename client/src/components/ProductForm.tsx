import type { Product } from "../types"
import { Warehouse , AlertTriangle } from "lucide-react"

type ProductFormProps={
    product?: Product
}

export default function ProductForm({product} : ProductFormProps) {
  return (
    <div className="space-y-6">
        <div className="relative">
            <label 
                htmlFor="nombre"
                className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3"
            >
                <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                </div>
                <span>Nombre del Producto</span>
            </label>
            <div className="relative">
                <input 
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Ej. Filtro de aceite, Pastillas de freno..."
                    defaultValue={product?.nombre}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent shadow-sm transition-all duration-200 hover:border-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>
        </div>

        <div className="relative">
            <label 
                htmlFor="precio"
                className="flex items-center space-x-2 text-sm font-semibold text-gray-800 mb-3"
            >
                <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                </div>
                <span>Precio del Producto</span>
            </label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm font-medium">$</span>
                </div>
                <input 
                    id="precio"
                    name="precio"
                    type="text"
                    placeholder="5000.00"
                    defaultValue={product?.precio}
                    className="w-full rounded-xl border border-gray-300 bg-white pl-8 pr-4 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-200 hover:border-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
                Ingresa el precio sin puntos ni comas. Solo números decimales.
            </p>
        </div>

        <div className="relative">
            <label 
                htmlFor="stock"
                className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3"
            >
                <div className="w-5 h-5 bg-slate-300 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-slate-300 rounded flex items-center justify-center">
                        <Warehouse className="w-4 h-4 text-black" />
                    </div>
                </div>
                <span>Stock inicial</span>
            </label>
            <div className="relative">
                <input 
                    id="stock"
                    name="stock"
                    type="text"
                    placeholder="Ej. 10, 20, 30, 40 ..."
                    defaultValue={product?.stock}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent shadow-sm transition-all duration-200 hover:border-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>
        </div>

        <div className="relative">
            <label 
                htmlFor="stockMinimo"
                className="flex items-center space-x-2 text-lg font-semibold text-gray-800 mb-3"
            >
                <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center">
                    <div className="w-5 h-5 bg-yellow-500 rounded flex items-center justify-center">
                        <AlertTriangle className="w-4 h-4 text-white" />
                    </div>
                </div>
                <span>Stock Minimo</span>
            </label>
            <div className="relative">
                <input 
                    id="stockMinimo"
                    name="stockMinimo"
                    type="text"
                    placeholder="Cantidad minima de Alerta Ej. 5, 3, 2"
                    defaultValue={product?.stockMinimo}
                    className="w-full rounded-xl border border-gray-300 bg-white px-4 py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-transparent shadow-sm transition-all duration-200 hover:border-gray-400"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            </div>
        </div>
    </div>
  )
}