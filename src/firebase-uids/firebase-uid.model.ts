import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../users/user.model'

interface FirebaseUidCreationAttrs {
  uid_firebase: string
  iduser: number
  uid_reference: string
}

@Table({ tableName: 'firebase_uids' })
export class FirebaseUid extends Model<FirebaseUid, FirebaseUidCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  idfirebaseuid: number

  @ApiProperty({ example: 'firebase_uid_example', description: 'Firebase UID' })
  @Column({ type: DataType.STRING, allowNull: false })
  uid_firebase: string

  @ApiProperty({ example: 'facebook', description: 'Authentication method' })
  @Column({ type: DataType.STRING, allowNull: true })
  uid_reference: string

  @ApiProperty({ example: '1', description: 'User identifier' })
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  iduser: number

  @BelongsTo(() => User)
  user: User
}
