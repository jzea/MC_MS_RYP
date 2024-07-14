import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../users/user.model'
import { FileGalleries } from '../file-galleries/file-galleries.model'
import { AppType } from '../app-types/app-type.model'
import { Address } from '../address/address.model'

interface SellerCreationAttrs {
  type_seller: number
  number_rut: string
  website: string | null
  approved: boolean | null
  company_name: string | null
  company_email: string | null
  company_phone: string | null
  iduser: number
  idaddress: number | null
  file_company_constitution: number | null
  file_identity_verification: number | null
  idlegal_representative: number | null
}

@Table({ tableName: 'sellers' })
export class Seller extends Model<Seller, SellerCreationAttrs> {
  @ApiProperty({ example: 1, description: 'Unique identifier of the seller' })
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true, field: 'idseller' })
  idseller: number

  @ApiProperty({ example: '123456789', description: "Seller's RUT number" })
  @Column({ type: DataType.STRING, allowNull: true, field: 'number_rut' })
  number_rut: string

  @ApiProperty({ example: 'www.example.com', description: "Seller's website" })
  @Column({ type: DataType.STRING, allowNull: true, field: 'website' })
  website: string | null

  @ApiProperty({ example: true, description: 'Approval status of the seller' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'approved' })
  approved: boolean | null

  @ApiProperty({ example: true, description: 'whatsapp number status' })
  @Column({ type: DataType.BOOLEAN, allowNull: true, field: 'whatsapp_number' })
  whatsapp_number: boolean | null

  @ApiProperty({ example: 'ABC Company', description: "Name of the seller's company" })
  @Column({ type: DataType.STRING, allowNull: true, field: 'company_name' })
  company_name: string | null

  @ApiProperty({ example: 'contact@example.com', description: "Email of the seller's company" })
  @Column({ type: DataType.STRING, allowNull: true, field: 'company_email' })
  company_email: string | null

  @ApiProperty({ example: '+51911111111', description: "Phone number of the seller's company" })
  @Column({ type: DataType.STRING, allowNull: true, field: 'company_phone' })
  company_phone: string | null

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, field: 'iduser' })
  iduser: number

  @ForeignKey(() => Address)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'idaddress' })
  idaddress: number | null

  @ForeignKey(() => FileGalleries)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'file_company_constitution' })
  file_company_constitution: number | null

  @ForeignKey(() => FileGalleries)
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'file_identity_verification' })
  file_identity_verification: number | null

  @ForeignKey(() => AppType)
  @ApiProperty({ example: 1, description: "ID of the seller's type" })
  @Column({ type: DataType.INTEGER, allowNull: false, field: 'type_seller' })
  type_seller: number

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'ID of the legal representative ' })
  @Column({ type: DataType.INTEGER, allowNull: true, field: 'idlegal_representative' })
  idlegal_representative: number

  @BelongsTo(() => Address)
  address: Address

  @BelongsTo(() => User, 'idlegal_representative')
  legal_representative: User

  @BelongsTo(() => FileGalleries, 'file_company_constitution')
  company_constitution_galleries: FileGalleries

  @BelongsTo(() => FileGalleries, 'file_identity_verification')
  identity_verification_galleries: FileGalleries
}
