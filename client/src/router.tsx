import { createBrowserRouter } from 'react-router-dom'
import { Layout } from './layouts/Layout'
import { action as updateAvailabilityAction, loader as LoaderProducts, Products } from './views/Products'
import NewProduct, {action as NewProductAction} from './views/NewProduct'
import EditProduct, {loader as editProductLoader, action as editProductAction} from './views/EditProduct'
import { action as deleteProductAction } from './components/ProductDetail'
import Stocks from './views/Stocks'
import StockDetail from './components/StockDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        children:[
            {
                index:true,
                element: <Products />,
                loader: LoaderProducts,
                action:updateAvailabilityAction
            },
            {
                path:'productos/nuevo',
                element: <NewProduct />,
                action: NewProductAction
            },
            {
                path:'productos/:id/editar', //ROA pattern o Resource-Oriented design
                element:<EditProduct />,
                loader: editProductLoader,
                action: editProductAction
            },
            {
                path:'productos/:id/eliminar',
                action:deleteProductAction
            },
            {
                path:'stock',
                element:<Stocks />
            },
            {
                path:'stock/:id',
                element:<StockDetail />
            }
        ]
    }
])