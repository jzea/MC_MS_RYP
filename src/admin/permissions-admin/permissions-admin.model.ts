import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { ModulesAdmin } from '../modules-admin/modules-admin.model'

interface PermissionsAdminCreationAttrs {
  name_permission: string
  idmodule_admin: number
}

@Table({ tableName: 'permissions_admin' })
export class PermissionsAdmin extends Model<PermissionsAdmin, PermissionsAdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier for the permission' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idpermission_admin' })
  idpermission_admin: number

  @ApiProperty({ example: 'Permission Name', description: 'Name of the permission' })
  @Column({ type: DataType.STRING(200), allowNull: false, field: 'name_permission' })
  name_permission: string

  @ForeignKey(() => ModulesAdmin)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'idmodule_admin' })
  idmodule_admin: number

  @BelongsTo(() => ModulesAdmin)
  module: ModulesAdmin
}
