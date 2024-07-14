import { Model, Table, Column, DataType } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

interface ModulesAdminCreationAttrs {
  name_module: string
}

@Table({ tableName: 'modules_admin' })
export class ModulesAdmin extends Model<ModulesAdmin, ModulesAdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier for the module' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idmodule_admin' })
  idmodule_admin: number

  @ApiProperty({ example: 'Module Name', description: 'Name of the module' })
  @Column({ type: DataType.STRING(200), allowNull: false, field: 'name_module' })
  name_module: string
}
