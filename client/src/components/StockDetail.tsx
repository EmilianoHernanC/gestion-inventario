import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'



export default function StockDetail() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [movimientos, setMovimientos] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const prodRes = await axios.get(`/api/products/${id}`)
      const movRes = await axios.get(`/api/stock/producto/${id}`)
      setProducto(prodRes.data)
      setMovimientos(movRes.data.data)
    }
    fetchData()
  }, [id])

  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4"></h2>
      <p><strong>Precio:</strong> </p>
      <p><strong>Stock actual:</strong> </p>
      <p><strong>Stock mínimo:</strong> </p>

      <h3 className="mt-8 text-xl font-semibold">Movimientos</h3>
      <table className="w-full mt-4 table-auto border">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Cantidad</th>
            <th>Stock Nuevo</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          {movimientos.map((m, i) => (
            <tr key={i}>
              <td>fecha</td>
              <td>tipo</td>
              <td>cantidad</td>
              <td>stock nuevo</td>
              <td>motivo</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
