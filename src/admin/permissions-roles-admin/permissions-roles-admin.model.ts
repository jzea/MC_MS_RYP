import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { PermissionsAdmin } from '../permissions-admin/permissions-admin.model'
import { RoleAdmin } from '../roles-admin/roles-admin.model'

interface PermissionsRoleAdminCreationAttrs {
  idpermission_admin: number
  idrole_admin: number
}

@Table({ tableName: 'permissions_roles_admin' })
export class PermissionsRoleAdmin extends Model<PermissionsRoleAdmin, PermissionsRoleAdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier for the permission-role association' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idpermission_role_admin' })
  idpermission_role_admin: number

  @ForeignKey(() => PermissionsAdmin)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'idpermission_admin' })
  idpermission_admin: number

  @BelongsTo(() => PermissionsAdmin)
  permission: PermissionsAdmin

  @ForeignKey(() => RoleAdmin)
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'idrole_admin' })
  idrole_admin: number

  @BelongsTo(() => RoleAdmin)
  role: RoleAdmin
}
