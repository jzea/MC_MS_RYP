import { Model, Table, Column, DataType, ForeignKey, BelongsTo, HasOne } from 'sequelize-typescript'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Country } from 'src/address/countries/country.model'
import { FirebaseUid } from 'src/firebase-uids/firebase-uid.model'
import { FileGalleries } from 'src/file-galleries/file-galleries.model'
import { File } from 'src/files/file.model'
import { Seller } from 'src/sellers/seller.model'

import { Address } from '../address/address.model'

interface UserCreationAttrs {
  email: string
  password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  iduser: number

  @ApiProperty({ example: 'username', description: 'Username' })
  @Column({ type: DataType.STRING(100), allowNull: true })
  username: string

  @ApiProperty({ example: 'user@mail.ru', description: 'User email' })
  @Column({ type: DataType.STRING, allowNull: true })
  email: string

  @ApiProperty({ example: '123456', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: true })
  password: string

  @ApiProperty({ example: 'Antoni', description: 'User first name' })
  @Column({ type: DataType.STRING(50), allowNull: false })
  name: string

  @ApiProperty({ example: 'Zea', description: 'User last name' })
  @Column({ type: DataType.STRING(50), allowNull: true })
  surname: string

  @ApiProperty({ example: '123456789', description: 'User phone number' })
  @Column({ type: DataType.STRING(20), allowNull: true })
  phone_number: string

  @ApiProperty({
    enum: ['passport', 'identity_card', 'business_registration'],
    description: 'Type of identity document',
  })
  @Column({
    type: DataType.ENUM('passport', 'identity_card', 'business_registration'),
    allowNull: true,
  })
  document_type: string

  @ApiProperty({ example: '1234567890', description: 'User document number' })
  @Column({ type: DataType.STRING(20), allowNull: true })
  document_number: string

  @ApiProperty({ example: 1, description: 'User type identifier' })
  @Column({ type: DataType.INTEGER, allowNull: true })
  user_type: number

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user has been approved as an international seller',
  })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  approved: boolean

  @ForeignKey(() => FileGalleries)
  @ApiProperty({
    example: 1,
    description: 'Identifier of the user profile picture gallery',
  })
  @Column({ type: DataType.INTEGER, allowNull: true })
  file_profile_picture: number

  @ApiProperty({
    example: true,
    description: 'Indicates whether the user accepts the terms and conditions',
  })
  @Column({ type: DataType.BOOLEAN, allowNull: true })
  accept_terms: boolean

  @ApiProperty({ example: '2023-12-22', description: 'User birthday' })
  @Column({ type: DataType.DATE, allowNull: true })
  birthdate: Date

  @ApiProperty({
    enum: ['Hombre', 'Mujer'],
    description: 'Gender',
  })
  @Column({ type: DataType.ENUM('Hombre', 'Mujer'), allowNull: true })
  sex: string

  @ApiProperty({ example: true, description: 'User account status' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: true })
  active: boolean

  @ApiProperty({ example: 'fcm_token', description: 'User FCM token' })
  @Column({ type: DataType.STRING(255), allowNull: true })
  token_fcm: string

  @ApiPropertyOptional({
    example: 'firebase_uid_example',
    description: 'Firebase UID',
    required: true,
  })
  uid_firebase?: string

  @ApiProperty({ example: 'Baneado', description: 'Reason for user deletion' })
  @Column({ type: DataType.STRING(255), allowNull: true })
  comment: string

  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER, allowNull: true })
  idcountry: number

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'idaddress' })
  idaddress: number | null

  @ApiProperty({ example: 'es', description: 'Language of the user' })
  @Column({ type: DataType.STRING(10), allowNull: true, field: 'lang' })
  lang: string

  @ApiProperty({ example: 1, description: 'File documents ID' })
  @ForeignKey(() => FileGalleries)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'file_documents' })
  file_documents: number | null

  @BelongsTo(() => Country)
  country: Country

  @BelongsTo(() => Address)
  address: Address

  @HasOne(() => FirebaseUid)
  firebase_uid: FirebaseUid

  @HasOne(() => Seller)
  seller: Seller

  @BelongsTo(() => FileGalleries, 'file_profile_picture')
  file_profile: FileGalleries

  @BelongsTo(() => File, { foreignKey: 'file_profile_picture', targetKey: 'idgallery' })
  file_profiles: File
}
