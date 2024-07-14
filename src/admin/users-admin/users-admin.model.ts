import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { FileGalleries } from 'src/file-galleries/file-galleries.model'
import { File } from 'src/files/file.model'

import { RoleAdmin } from '../roles-admin/roles-admin.model'

interface UserAdminCreationAttrs {
  name_user: string | null
  email: string | null
  password: string | null
  idrole_admin: number
  photo_idgallery: number
}

@Table({ tableName: 'users_admin' })
export class UserAdmin extends Model<UserAdmin, UserAdminCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the admin user' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'iduser_admin' })
  iduser_admin: number

  @ApiProperty({ example: 'John Doe', description: 'Name of the admin user' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'name_user' })
  name_user: string | null

  @ApiProperty({ example: 'admin@example.com', description: 'Email of the admin user' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'email' })
  email: string | null

  @ApiProperty({ example: 'hashedPassword', description: 'Password of the admin user' })
  @Column({ type: DataType.STRING, allowNull: true, field: 'password' })
  password: string | null

  @ForeignKey(() => RoleAdmin)
  @Column({ type: DataType.INTEGER, field: 'idrole_admin' })
  idrole_admin: number

  @ForeignKey(() => FileGalleries)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'photo_idgallery' })
  photo_idgallery: number

  @BelongsTo(() => RoleAdmin)
  role: RoleAdmin

  @BelongsTo(() => FileGalleries)
  photo: FileGalleries

  @BelongsTo(() => File, { foreignKey: 'photo_idgallery', targetKey: 'idgallery' })
  file_profile: File
}
