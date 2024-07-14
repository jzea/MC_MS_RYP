import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface CountryCreationAttrs {
  country_name: string
  country_code: string
}

@Table({ tableName: 'countries' })
export class Country extends Model<Country, CountryCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the country' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idcountry' })
  idcountry: number

  @ApiProperty({ example: 'United States', description: 'Country name' })
  @Column({ type: DataType.STRING, field: 'country_name' })
  country_name: string

  @ApiProperty({ example: 'United States', description: 'Country name' })
  @Column({ type: DataType.STRING, field: 'country_name_en' })
  country_name_en: string

  @ApiProperty({ example: 'United States', description: 'Country name' })
  @Column({ type: DataType.STRING, field: 'country_name_es' })
  country_name_es: string

  @ApiProperty({ example: 'US', description: 'Country code' })
  @Column({ type: DataType.STRING, field: 'country_code' })
  country_code: string

  @ApiProperty({ example: '+51', description: 'Code' })
  @Column({ type: DataType.STRING, field: 'code' })
  code: string
}
