import { Model, Table, Column, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript'
import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/user.model'

interface VirtualWalletCreationAttrs {
  iduser: number
  available_balance: number
  retained_balance: number
}

@Table({ tableName: 'virtual_wallet' })
export class VirtualWallet extends Model<VirtualWallet, VirtualWalletCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier for the virtual wallet' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  idvirtual_wallet: number

  @ForeignKey(() => User)
  @ApiProperty({ example: 1, description: 'Identifier of the associated user' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  iduser: number

  @ApiProperty({ example: '1000.00', description: 'Available balance in the virtual wallet' })
  @Column({ type: DataType.DECIMAL(18, 2), allowNull: false })
  available_balance: number

  @ApiProperty({ example: '500.00', description: 'Retained balance in the virtual wallet' })
  @Column({ type: DataType.DECIMAL(18, 2), allowNull: false })
  retained_balance: number

  @BelongsTo(() => User)
  user: User
}
