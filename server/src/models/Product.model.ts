import { Table, Column, Model, DataType, Default, HasMany } from 'sequelize-typescript'
import Stock from './Stock.model'

//Sintaxis de un decorador

@Table({
    tableName: 'productos'
})

class Producto extends Model {
    @Column({
        type: DataType.STRING(100)
    })
    declare nombre: string

    @Column({
        type: DataType.FLOAT
    })
    declare precio: number

    @Default(true)
    @Column({
        type: DataType.BOOLEAN
    })
    declare disponibilidad: boolean

    @Column({
        type:DataType.INTEGER
    })
    declare stock: number

    @Column({
        type:DataType.INTEGER
    })
    declare stockMinimo: number

    @Default(DataType.NOW)
    @Column({
        type: DataType.DATE
    })
    declare fechaCreacion: Date

    @Column({
        type: DataType.DATE
    })
    declare fechaModificacion: Date

    // Relación con StockMovements
    @HasMany(() => Stock)
    declare movimientos: Stock[]

    //Eliminar el cascada
    @HasMany(() => Stock, {onDelete: 'CASCADE', hooks:true})
    declare movimientosEliminar: Stock[]
}
export default Producto