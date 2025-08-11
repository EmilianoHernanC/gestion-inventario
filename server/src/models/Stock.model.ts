import { Table, Column, Model, DataType, Default, ForeignKey, BelongsTo } from 'sequelize-typescript'
import Producto from './Product.model'

@Table({
    tableName: 'Stock'
})

class Stock extends Model{
    @ForeignKey(() => Producto)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    declare productId: number

    @Column({
        type: DataType.ENUM('entrada', 'salida', 'ajuste'),
        allowNull: false
    })
    declare tipo: 'entrada' | 'salida' | 'ajuste'

    @Column({
        type: DataType.INTEGER
    })
    declare cantidad: number

    @Column({
        type: DataType.INTEGER
    })
    declare stockAnterior: number

    @Column({
        type: DataType.INTEGER
    })
    declare stockNuevo: number

    @Column({
        type: DataType.STRING
    })
    declare motivo: string

    @Column({
        type: DataType.DATE
    })
    declare fecha: Date
 
    // Relación con Producto
    @BelongsTo(() => Producto)
    declare producto: Producto
}

export default Stock