import { Model, Table, Column, DataType, ForeignKey } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Country } from '../countries/country.model'

interface RegionCreationAttrs {
  region_name: string
  idcountry: number
}

@Table({ tableName: 'regions' })
export class Region extends Model<Region, RegionCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the region' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idregion' })
  idregion: number

  @ApiProperty({ example: 'Northeast', description: 'Region name' })
  @Column({ type: DataType.STRING, field: 'region_name' })
  region_name: string

  @ForeignKey(() => Country)
  @ApiProperty({ example: 1, description: 'ID of the associated country' })
  @Column({ type: DataType.INTEGER, field: 'idcountry' })
  idcountry: number
}
