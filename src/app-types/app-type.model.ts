import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface AppTypeAttrs {
  idapptype: number
  type_name: string
}

@Table({ tableName: 'app_types' })
export class AppType extends Model<AppType, AppTypeAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the application type' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idapptype' })
  idapptype: number

  @ApiProperty({ example: 'Mobile', description: 'Name of the application type' })
  @Column({ type: DataType.STRING, allowNull: false, field: 'type_name' })
  type_name: string
}
