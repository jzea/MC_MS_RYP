import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { UserAdmin } from '../users-admin/users-admin.model'

interface RoleAdminCreationAttrs {
  name_rol: string | null
  active: boolean | null
  iduser_creator: number | null
}

@Table({ tableName: 'roles_admin' })
export class RoleAdmin extends Model<RoleAdmin, RoleAdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the admin role' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idrole_admin' })
  idrole_admin: number

  @ApiProperty({ example: 'Admin', description: 'Name of the admin role' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'name_role' })
  name_role: string | null

  @ApiProperty({ example: true, description: 'Activation status of the admin role' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'active' })
  active: boolean | null

  @ForeignKey(() => UserAdmin)
  @Column({ type: DataType.INTEGER, field: 'iduser_creator' })
  iduser_creator: number | null

  @BelongsTo(() => UserAdmin)
  creator: UserAdmin
}
