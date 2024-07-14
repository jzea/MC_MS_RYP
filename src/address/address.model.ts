import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { AppType } from 'src/app-types/app-type.model'
import { ReceivingPort } from 'src/receiving-port/receiving-port.model'

import { User } from '../users/user.model'

import { City } from './cities/city.model'

interface AddressCreationAttrs {
  postal_code: string | null
  address: string | null
  main_address: boolean | null
  type_address: number | null
  active: boolean | null
  idcity: number
  iduser: number
}

@Table({ tableName: 'address' })
export class Address extends Model<Address, AddressCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the address' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idaddress' })
  idaddress: number

  @ApiProperty({ example: '12345', description: 'Postal code' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'postal_code' })
  postal_code: string | null

  @ApiProperty({ example: '123 Main St', description: 'Address' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'address' })
  address: string | null

  @ApiProperty({ example: true, description: 'Indicator for the main address' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'main_address' })
  main_address: boolean | null

  @ForeignKey(() => City)
  @ApiProperty({ example: 1, description: 'ID of the associated city' })
  @Column({ type: DataType.INTEGER, field: 'idcity' })
  idcity: number

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'ID of the associated user' })
  @Column({ type: DataType.INTEGER, field: 'iduser' })
  iduser: number

  @ForeignKey(() => ReceivingPort)
  @ApiProperty({ example: 1, description: 'ID of the associated receiving port' })
  @Column({ type: DataType.INTEGER, field: 'idreceiving_port' })
  idreceiving_port: number | null

  @ForeignKey(() => AppType)
  @ApiProperty({ example: 1, description: 'ID del Tipo de dirección' })
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'type_address' })
  type_address: number

  @ApiProperty({ example: true, description: 'Indicator for the active address' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'active' })
  active: boolean | null

  @BelongsTo(() => City)
  city: City
}
