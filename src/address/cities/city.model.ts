import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { Country } from '../countries/country.model'

interface CityCreationAttrs {
  city_name: string
  idcountry: number
}

@Table({ tableName: 'cities' })
export class City extends Model<City, CityCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the city' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idcity' })
  idcity: number

  @ApiProperty({ example: 'New York', description: 'City name' })
  @Column({ type: DataType.STRING, field: 'city_name' })
  city_name: string

  @ForeignKey(() => Country)
  @ApiProperty({ example: 1, description: 'ID of the associated country' })
  @Column({ type: DataType.INTEGER, field: 'idcountry' })
  idcountry: number

  @BelongsTo(() => Country)
  country: Country
}
