import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Country } from '../address/countries/country.model'

interface ReceivingPortCreationAttrs {
  name: string | null
  idcountry: number
}

@Table({ tableName: 'receiving_port' })
export class ReceivingPort extends Model<ReceivingPort, ReceivingPortCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Identificador único del puerto de recepción' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idreceiving_port' })
  idreceiving_port: number

  @ApiProperty({ example: 'Port of Entry', description: 'Nombre del puerto de recepción' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'name' })
  name: string | null

  @ForeignKey(() => Country)
  @ApiProperty({ example: 1, description: 'ID del país asociado' })
  @Column({ type: DataType.INTEGER, field: 'idcountry' })
  idcountry: number

  @BelongsTo(() => Country)
  country: Country
}
